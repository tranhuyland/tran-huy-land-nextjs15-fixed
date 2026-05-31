"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Search, MapPin, DollarSign, Building, ArrowRight, Star, Heart, Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";

// 1. CHUYỂN TOÀN BỘ LOGIC VÀ GIAO DIỆN TRANG CHỦ VÀO COMPONENT NÀY
function HomeContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [favorites, setFavorites] = useState([]);

  // Mock data cho danh sách bất động sản
  const properties = [
    {
      id: 1,
      title: "Căn Hộ Cao Cấp Ocean View",
      type: "apartment",
      location: "Sơn Trà, Đà Nẵng",
      price: 3500000000,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60",
      beds: 2,
      baths: 2,
      area: 75,
      featured: true
    },
    {
      id: 2,
      title: "Biệt Thự Sân Vườn Ven Sông",
      type: "villa",
      location: "Ngũ Hành Sơn, Đà Nẵng",
      price: 12500000000,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60",
      beds: 4,
      baths: 4,
      area: 250,
      featured: true
    },
    {
      id: 3,
      title: "Nhà Phố Kinh Doanh Mặt Tiền",
      type: "house",
      location: "Hải Châu, Đà Nẵng",
      price: 8500000000,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60",
      beds: 3,
      baths: 3,
      area: 110,
      featured: false
    }
  ];

  // Đồng bộ bộ lọc từ URL (nếu có) khi sử dụng useSearchParams
  useEffect(() => {
    const typeParam = searchParams.get("type");
    const priceParam = searchParams.get("price");
    if (typeParam) setSelectedType(typeParam);
    if (priceParam) setSelectedPrice(priceParam);
  }, [searchParams]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} Tỷ`;
    }
    return `${(price / 1000000).toFixed(0)} Triệu`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&auto=format&fit=crop&q=80" 
            alt="Real Estate Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Tìm Kiếm Bất Động Sản Hoàn Hảo Tại Đà Nẵng
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Hệ thống phân phối nhà phố, căn hộ, biệt thự uy tín hàng đầu - Trần Huy Land
          </p>

          {/* Thanh tìm kiếm nhanh */}
          <div className="bg-white p-4 rounded-xl shadow-lg text-gray-800 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Nhập khu vực, tên dự án..." 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <select 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">Tất cả loại hình</option>
                  <option value="apartment">Căn hộ</option>
                  <option value="house">Nhà phố</option>
                  <option value="villa">Biệt thự</option>
                </select>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danh mục nổi bật */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Bất Động Sản Nổi Bật</h2>
            <p className="text-gray-600 mt-2">Danh sách các dự án hot nhất đang được quan tâm</p>
          </div>
          <button className="text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-700">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="relative h-64 w-full bg-gray-200">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                {property.featured && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Nổi bật
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
                  <Building className="h-4 w-4 mr-1" />
                  {property.type === "apartment" ? "Căn hộ" : property.type === "villa" ? "Biệt thự" : "Nhà phố"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  {property.location}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-2xl font-bold text-red-600">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {property.area} m² | {property.beds} PN
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. EXPORT CHÍNH ĐƯỢC BỌC TRONG SUSPENSE HOÀN CHỈNH
export default function Home() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Đang khởi tạo ứng dụng Trần Huy Land...</p>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
