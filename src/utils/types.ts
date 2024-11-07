interface ProductsApiResponse {
  quotes: Product[]
  total: number
  skip: number
  limit: number
}

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: MetaData
  thumbnail: string
  images: string[]
}

interface Dimensions {
  width: number
  height: number
  depth: number
}

interface Review {
  rating: number
  comment: string
  date: string // ISO 8601 date format
  reviewerName: string
  reviewerEmail: string
}

interface MetaData {
  createdAt: string // ISO 8601 date format
  updatedAt: string // ISO 8601 date format
  barcode: string
  qrCode: string // Assuming it's a string URL or base64 encoded string
}

export type { ProductsApiResponse, Product, Dimensions, Review, MetaData }
