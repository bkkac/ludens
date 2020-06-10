declare interface IBreadcrumbItem {
  label: string
  path?: string
  active?: boolean
}

declare interface IBreadcrumbProps {
  items: IBreadcrumbItem[]
  handleOnClickItem?(path?: string): void
}