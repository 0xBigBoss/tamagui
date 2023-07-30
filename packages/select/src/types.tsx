import type { ContextData, FloatingContext, ReferenceType } from '@floating-ui/react'
import type { NativePlatform, NativeValue, SizeTokens } from '@tamagui/core'
import type { Scope } from '@tamagui/create-context'
import type { ThemeableStackProps, YStackProps } from '@tamagui/stacks'
import type { DispatchWithoutAction, HTMLProps, MutableRefObject, ReactNode } from 'react'

export type Direction = 'ltr' | 'rtl'

export type ScopedProps<P> = P & { __scopeSelect?: Scope }

export type SelectImplProps = ScopedProps<SelectProps> & {
  activeIndexRef: any
  selectedIndexRef: any
  listContentRef: any
}

export interface SelectProps {
  id?: string
  children?: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  dir?: Direction
  name?: string
  autoComplete?: string
  size?: SizeTokens
  /**
   * If passed, will render a native component instead of the custom one. Currently only `web` is supported.
   */
  native?: NativeValue<'web'>
}

type DisposeFn = () => void
export type EmitterSubscriber<Val> = (cb: (val: Val) => void) => DisposeFn

export interface SelectItemParentContextValue {
  setSelectedIndex: (index: number) => void
  listRef?: MutableRefObject<Array<HTMLElement | null>>
  setOpen: (open: boolean) => void
  onChange: (value: string) => void
  activeIndexSubscribe: EmitterSubscriber<number>
  valueSubscribe: EmitterSubscriber<any>
  allowSelectRef?: MutableRefObject<boolean>
  allowMouseUpRef?: MutableRefObject<boolean>
  setValueAtIndex: (index: number, value: string) => void
  selectTimeoutRef?: MutableRefObject<any>
  dataRef?: MutableRefObject<ContextData>
  interactions?: {
    getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => any
    getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => any
    getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => any
  }
  shouldRenderWebNative?: boolean
  size?: SizeTokens
}

export interface SelectContextValue {
  dir?: Direction
  scopeKey: string
  sheetBreakpoint: string | boolean | null
  value: any
  selectedItem: ReactNode
  setSelectedItem: (item: ReactNode) => void
  selectedIndex: number
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  open: boolean
  valueNode: Element | null
  onValueNodeChange(node: HTMLElement): void
  forceUpdate: DispatchWithoutAction
  // SheetImpl only:
  isInSheet?: boolean
  // InlineImpl only:
  fallback: boolean
  blockSelection: boolean
  upArrowRef?: MutableRefObject<HTMLDivElement | null>
  downArrowRef?: MutableRefObject<HTMLDivElement | null>
  setScrollTop?: Function
  setInnerOffset?: Function
  controlledScrolling?: boolean
  canScrollUp?: boolean
  canScrollDown?: boolean
  floatingContext?: FloatingContext<ReferenceType>
  native?: NativeValue
  /** update floating-ui to recalculate */
  update?: () => void
}

export type SelectViewportProps = ThemeableStackProps & {
  size?: SizeTokens
  disableScroll?: boolean
  unstyled?: boolean
}

export type SelectContentProps = ScopedProps<{
  children?: React.ReactNode
  zIndex?: number
}>

export interface SelectScrollButtonImplProps extends YStackProps {
  dir: 'up' | 'down'
  componentName: string
}

export interface SelectScrollButtonProps
  extends Omit<SelectScrollButtonImplProps, 'dir' | 'componentName'> {}
