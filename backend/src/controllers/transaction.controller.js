import prisma from "../lib/prisma.js";

export const getTransaction = async (req, res) => {
  try {
    const { id } = req.user;
    const transaction = await prisma.transaction.findMany({
      where: {
        userId: id,
      },
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan semua data transaction",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { id } = req.user;

    const { type, amount, description, categoryId, date } = req.body;
    if (!type || !amount || !description || !categoryId || !date)
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi!",
      });

    const validType = ["INCOME", "EXPENSE"];
    if (!validType.includes(type))
      return res.status(400).json({
        success: false,
        message: "Type tidak valid!",
      });

    if (amount <= 0)
      return res.status(400).json({
        success: false,
        message: "Amount harus lebih dari 0",
      });

    const checkCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!checkCategory)
      return res.status(400).json({
        success: false,
        message: "Kategory tidak ditemukan",
      });

    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        categoryId,
        type,
        userId: id,
        date: new Date(date),
        description,
      },
      include: {
        category: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Transaction berhasil ditambahkan!",
      data: newTransaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getSummary = async (req, res) => {
  try {
    const date = new Date();
    const month = parseInt(req.query.month) || date.getMonth() + 1;
    const year = parseInt(req.query.year) || date.getFullYear();
    const { id } = req.user;

    const startDate = new Date(year, month - 1, 1); // month di js dimulai dari 0
    const endDate = new Date(year, month, 0); // tanggal = 0 berarti akhir bulan dari bulan sebelumya

    const result = await prisma.transaction.groupBy({
      by: ["type"],
      _sum: { amount: true },
      where: {
        userId: id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const incomeData = result.find((r) => r.type === "INCOME");
    const expenseData = result.find((r) => r.type === "EXPENSE");

    const totalIncome = parseFloat(incomeData?._sum.amount ?? 0);
    const totalExpense = parseFloat(expenseData?._sum.amount ?? 0);
    const balance = totalIncome - totalExpense;

    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data summary",
      data: {
        balance,
        totalIncome,
        totalExpense,
        month,
        year,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getByCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const date = new Date();
    const month = parseInt(req.query.month) || date.getMonth() + 1;
    const year = parseInt(req.query.year) || date.getFullYear();
    date.get;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const groupResult = await prisma.transaction.groupBy({
      by: ["categoryId"],
      _sum: { amount: true },
      where: {
        userId,
        type: "EXPENSE",
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (groupResult.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          categories: [],
          totalExpense: 0,
        },
      });
    }

    const totalExpense = groupResult.reduce(
      (sum, item) => sum + parseFloat(item._sum.amount),
      0,
    );

    const categoryIds = groupResult.map((item) => item.categoryId);

    const categoryList = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // merge groupResult dengan categoryList
    const categories = groupResult.map((item) => {
      const category = categoryList.find((c) => c.id === item.categoryId);
      return {
        categoryId: item.categoryId,
        name: category.name,
        icon: category.icon,
        total: parseFloat(item._sum.amount),
        percentage: parseFloat(
          ((item._sum.amount / totalExpense) * 100).toFixed(1),
        ),
      };
    });

    // sort by total - terbesar dulu
    categories.sort((a, b) => b.total - a.total);

    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data by category!",
      data: { categories, totalExpense, month, year },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error!",
    });
  }
};

export const getByTren = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const period = req.query.period;
    const year = now.getFullYear();

    let startDate;
    const endDate = new Date();
    if (period === "7d") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 6);
    } else if (period === "1m") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(1);
    } else if (period === "3m") {
      startDate = new Date(year, now.getMonth() - 2, 1);
      startDate.setHours(0, 0, 0, 0);
    } else {
      return res.status(400).json({
        success: false,
        message: "Periode tidak valid! gunakan 7d,1m atau 3m",
      });
    }

    const transaction = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        type: true,
        date: true,
        amount: true,
      },
      orderBy: { date: "asc" },
    });

    const grouped = transaction.reduce((acc, item) => {
      let date;
      if (period === "3m") {
        date = item.date.toISOString().slice(0, 7); // YYYY-MM
      } else {
        date = item.date.toISOString().split("T")[0]; // YYYY-MM-DD
      }
      if (!acc[date]) {
        acc[date] = {
          date,
          income: 0,
          expense: 0,
        };
      }

      if (item.type === "INCOME") {
        acc[date].income += item.amount;
      } else {
        acc[date].expense += item.amount;
      }

      return acc;
    }, {});

    const result = Object.values(grouped);

    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan transaction by tren",
      data: { trend: result, period },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = parseInt(req.params.id);
    console.log(transactionId);

    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        id: transactionId,
      },
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction tidak ditemukan",
      });
    }

    const { type, amount, description, categoryId, date } = req.body;
    console.log(req.body);
    if (!type || !amount || !description || !categoryId || !date) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }
    const validType = ["INCOME", "EXPENSE"];
    if (!validType.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type harus INCOME atau EXPENSE saja",
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount harus lebih dari 0 dan bertipe angka",
      });
    }
    const parseDate = new Date(date);
    if (isNaN(parseDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Format tanggal tidak valid",
      });
    }

    const checkCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!checkCategory) {
      return res.status(404).json({
        success: false,
        message: "Category tidak ditemukan",
      });
    }

    const update = await prisma.transaction.update({
      where: { id: transactionId, userId },
      data: { type, amount, description, categoryId, date: parseDate },
      include: {
        category: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil mengupdate transaction",
      data: update,
    });

    // console.log(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = parseInt(req.params.id);

    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction tidak ditemukan",
      });
    }

    const deleteTransaction = await prisma.transaction.delete({
      where: { id: transactionId, userId },
    });

    return res.status(200).json({
      success: true,
      message: "Transaksi berhasil di hapus",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
