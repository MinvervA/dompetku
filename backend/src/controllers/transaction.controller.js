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
