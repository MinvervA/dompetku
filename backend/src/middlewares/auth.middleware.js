import { verifyToken } from "../lib/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    // ambil token dari header
    const header = req.headers.authorization;

    // cek header ada & format benar
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Akses ditolak",
      });
    }

    // ambil tokennya saja
    const token = header.split(" ")[1];

    // verifikasi token
    const decoded = verifyToken(token);
    // apakah kalau token salah akan langsung ke catch?

    // tempel ke request
    req.user = decoded;

    // lanjut ke controller
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau expired",
    });
  }
};
