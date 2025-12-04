// Get POI style based on tags
export function getPoiStyle(tags) {
  if (!tags) return { icon: 'fa-map-pin', color: '#94a3b8', label: 'Địa điểm' };
  if (tags.amenity === 'restaurant' || tags.cuisine) return { icon: 'fa-utensils', color: '#f97316', label: 'Ẩm thực' };
  if (tags.amenity === 'cafe') return { icon: 'fa-mug-hot', color: '#854d0e', label: 'Cafe' };
  if (tags.tourism === 'hotel') return { icon: 'fa-bed', color: '#3b82f6', label: 'Khách sạn' };
  if (tags.tourism === 'museum' || tags.tourism === 'attraction') return { icon: 'fa-camera', color: '#8b5cf6', label: 'Tham quan' };
  if (tags.historic) return { icon: 'fa-landmark', color: '#ef4444', label: 'Di tích' };
  if (tags.leisure === 'park') return { icon: 'fa-tree', color: '#10b981', label: 'Thiên nhiên' };
  if (tags.shop) return { icon: 'fa-bag-shopping', color: '#ec4899', label: 'Mua sắm' };
  if (tags.amenity === 'place_of_worship') return { icon: 'fa-place-of-worship', color: '#f59e0b', label: 'Tôn giáo' };
  return { icon: 'fa-map-pin', color: '#64748b', label: 'Địa điểm' };
}
