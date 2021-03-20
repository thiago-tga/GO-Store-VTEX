import { Box, Flex, ShelfTitle, useResponsiveSlider } from '@vtex/store-ui'
import React from 'react'
import type { FC } from 'react'

import ShelfPage from './Page'
import Traco from './Traco'
import type { ProductSummary_ProductFragment } from '@vtex/gatsby-theme-store/src/components/ProductSummary/__generated__/ProductSummary_product.graphql'

type Product = Maybe<ProductSummary_ProductFragment>

export interface Props {
  products: Maybe<Product[]>
  pageSizes?: number[]
  title?: JSX.Element | string
  variant?: string
}

const PAGE_SIZES = [6]

const Shelf: FC<Props> = ({
  products,
  title,
  variant = 'default',
  pageSizes = PAGE_SIZES,
}) => {
  const { items } = useResponsiveSlider<Product>({
    pageSizes,
    defaultIndex: pageSizes.length - 1,
    allItems: products as Product[],
  })

  return (
    <Flex
      variant={variant}
      sx={{
        flexDirection: 'column',
        // width: '909px',
        width: '80%',
        margin: 'auto',
        paddingLeft: 1,
        paddingBottom: '3rem',
      }}
    >
      {title && <ShelfTitle variant={variant}>{title}</ShelfTitle>}
      <Traco />
      <ShelfPage
        variant={variant}
        items={items}
        sx={{
          flexWrap: 'wrap',
          columns: '3',
          gap: 1,
        }}
      />
    </Flex>
  )
}

export default Shelf
