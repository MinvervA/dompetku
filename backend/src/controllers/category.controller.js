import prisma from "../lib/prisma.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    // statusnya harus 200 karena bersifat mengambil bukan create ( 201)
    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan semua data category!",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
