const S3_IMAGE_URL = 'https://media3.scdn.vn';

const mapToProduct = (product) => ({
  id: product.id,
  name: product.name,
  shortDescription: product.short_description,
  description: product.description,
  originalPrice: product.price,
  salePrice: product.final_price,
  isPromotion: product.is_promotion,
  promotionPercent: product.promotion_percent,
  images: product.images.map((url) => `${S3_IMAGE_URL}${url}`),
  isFreeShip: product.is_free_ship,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

module.exports.mapToProduct = mapToProduct;
