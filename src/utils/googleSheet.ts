export interface RealEstateItem {
  id: number;
  tieude: string;
  moTa: string;
  gia: string;
  soGia: number;
  dienTich: string;
  khuVuc: string;
  khuVucFull: string;
  loaiHinh: string;
  huong: string;
  phongNgu?: string;
  phapLy?: string;
  tag?: string;
  tagColor?: string;
  anh: string;
  anhSoDo?: string;
  videoUrl?: string;
  linkMap?: string;
  ngayDang: string;
  isMatTien: boolean | string;
}

export async function fetchGoogleSheetData(): Promise<RealEstateItem[]> {
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1-LupBV6uNuUitz4vF6pFv6MupuVDMujafqhjQBNNPTA/export?format=csv";

  try {
    const response = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) throw new Error("Không thể kết nối dữ liệu Google Sheet");

    const text = await response.text();
    const lines = text.split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim().replace(/[\"']/g, ""));
    const jsonResult: RealEstateItem[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const currentLine: string[] = [];
      let insideQuote = false;
      let entries = "";

      for (let j = 0; j < lines[i].length; j++) {
        let char = lines[i][j];
        if (char === '"') {
          insideQuote = !insideQuote;
        } else if (char === "," && !insideQuote) {
          currentLine.push(entries.trim());
          entries = "";
        } else {
          entries += char;
        }
      }
      currentLine.push(entries.trim());

      if (currentLine.length >= headers.length) {
        const obj: any = {};
        headers.forEach((h, idx) => {
          let val = currentLine[idx] ? currentLine[idx].replace(/[\"']/g, "") : "";
          if (h === "id") obj[h] = parseInt(val) || i;
          else if (h === "soGia") obj[h] = parseFloat(val) || 0;
          else if (h === "isMatTien") obj[h] = val.toUpperCase() === "TRUE";
          else obj[h] = val.replace(/[\r\n]/g, "").trim();
        });
        jsonResult.push(obj as RealEstateItem);
      }
    }
    return jsonResult;
  } catch (error) {
    console.error("Lỗi fetch Google Sheet:", error);
    return [];
  }
}

export function chuyenDoiNgayThangChuan(ngayDangStr: string) {
  if (!ngayDangStr) return null;
  const chuoiSach = ngayDangStr.toString().replace(/[\r\n\t]/g, "").trim();
  if (!chuoiSach) return null;

  const parts = chuoiSach.split(/[-/]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) return d;
    }
  }
  return null;
}

export function tinhThoiGianCachDay(ngayDangStr: string) {
  const ngayDang = chuyenDoiNgayThangChuan(ngayDangStr);
  if (!ngayDang) return "Tin mới";
  
  const homNay = new Date();
  ngayDang.setHours(0,0,0,0);
  homNay.setHours(0,0,0,0);
  
  const hieuThoiGian = homNay.getTime() - ngayDang.getTime();
  const soNgay = Math.floor(hieuThoiGian / (1000 * 60 * 60 * 24));
  
  if (soNgay <= 0) return "Hôm nay";
  if (soNgay === 1) return "1 ngày trước";
  if (soNgay < 7) return `${soNgay} ngày trước`;
  
  const soTuan = Math.floor(soNgay / 7);
  if (soTuan < 4) return `${soTuan} tuần trước`;
  
  const soThang = Math.floor(soNgay / 30);
  if (soThang < 12) return `${soThang} tháng trước`;
  
  return `${ngayDang.getDate()}/${ngayDang.getMonth() + 1}/${ngayDang.getFullYear()}`;
}