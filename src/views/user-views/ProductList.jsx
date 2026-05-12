import 'swiper/css'

import Products from './ProductsDisplay'
export default function ProductList() {
  return (
    <>
      <Products limit={10} />
      <hr />
    </>
  )
}
