import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  
} from "@/components/ui/navigation-menu"

import { items } from "@/utils/item"







export function HeaderItems() {
  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.key}>
            <NavigationMenuTrigger className="font-semibold">{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-0 p-2 md:w-[300px] lg:w-[300px]">
                {item.children.map((child) => (
                  <ListItem key={child.key} href={`/products/${child.key}`} title={child.label} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary  hover:text-white focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"




