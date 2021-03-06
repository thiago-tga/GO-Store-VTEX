import type { FC } from 'react'
import React, { lazy } from 'react'
import type { BreadcrumbItem } from '@vtex/store-ui'
import { Breadcrumb, Box } from '@vtex/store-ui'
import Container from '@vtex/gatsby-theme-store/src/components/Container'
import SuspenseDevice from '@vtex/gatsby-theme-store/src/components/Suspense/Device'
import Controls from '@vtex/gatsby-theme-store/src/components/Search/Controls'
import {
  SearchTemplateContainer,
  SearchTemplateAside,
  SearchTemplateMain,
} from '@vtex/gatsby-theme-store/src/components/Search/SearchTemplate'
import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from '@vtex/gatsby-theme-store/src/templates/__generated__/SearchPageQuery.graphql'
import type { PageProps } from 'gatsby'

import PageList from './List/index'
import { Banner } from './Banner'

const DesktopSearchFilters = lazy(
  () => import('@vtex/gatsby-theme-store/src/components/Search/Filters/Desktop')
)

type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables & { vtexCmsPageContent: any }
>

const AboveTheFold: FC<Props> = ({ data, pageContext }) => {
  const breadcrumb = (data.vtex.facets?.breadcrumb ?? []) as BreadcrumbItem[]

  return (
    <Container>
      <Breadcrumb breadcrumb={breadcrumb} type="SEARCH" />

      {pageContext.vtexCmsPageContent != null && (
        <Banner {...pageContext.vtexCmsPageContent} />
      )}

      <SearchTemplateContainer>
        <SearchTemplateAside>
          <SuspenseDevice device="desktop" fallback={null}>
            <DesktopSearchFilters
              isActive={(index: number) => index < 5}
              variant="desktop"
            />
          </SuspenseDevice>
        </SearchTemplateAside>

        <SearchTemplateMain>
          <Controls data={data} />
          <PageList initialData={data} />
        </SearchTemplateMain>
      </SearchTemplateContainer>
    </Container>
  )
}

export default AboveTheFold
