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
export function HeaderItemSheet() {
    return (
      <div className="max-h-[600px]">
            <NavigationMenu orientation="vertical" >
                <NavigationMenuList className="flex-col items-start space-x-0">
                    {items.map((item) => (
                        <NavigationMenuItem key={item.key}>
                            <NavigationMenuTrigger className="rounded-none capitalize w-60 pl-1 flex justify-between">{item.label}</NavigationMenuTrigger>
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
      </div>
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
// import * as React from "react";
// import { cn } from "@/lib/utils";
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { items } from "@/utils/item";

// export function HeaderItemSheet() {
//     return (
//         <NavigationMenu orientation="horizontal">
//             <NavigationMenuList>
//                 {items.map((item) => (
//                     <NavigationMenuItem key={item.key} className="relative">
//                         <NavigationMenuTrigger className="rounded-none capitalize w-60 pl-1 flex justify-between">
//                             {item.label}
//                         </NavigationMenuTrigger>
//                         {item.children && item.children.length > 0 && (
//                             <NavigationMenuContent
//                                 className="absolute left-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-10"
//                             // Remove sideOffset and alignOffset
//                             >
//                                 <ul className="grid gap-0 p-2 md:w-[300px] lg:w-[300px]">
//                                     {item.children.map((child) => (
//                                         <ListItem key={child.key} href={`/products/${child.key}`} title={child.label} />
//                                     ))}
//                                 </ul>
//                             </NavigationMenuContent>
//                         )}
//                     </NavigationMenuItem>
//                 ))}
//             </NavigationMenuList>
//         </NavigationMenu>
//     );
// }

// const ListItem = React.forwardRef<
//     React.ElementRef<"a">,
//     React.ComponentPropsWithoutRef<"a">
// >(({ className, title, ...props }, ref) => {
//     return (
//         <li className="h-96">
//             <NavigationMenuLink asChild>
//                 <a
//                     ref={ref}
//                     className={cn(
//                         "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent focus:text-accent-foreground",
//                         className
//                     )}
//                     {...props}
//                 >
//                     <div className="text-sm font-medium leading-none">{title}</div>
//                 </a>
//             </NavigationMenuLink>
//         </li>
//     );
// });
// ListItem.displayName = "ListItem";




// export { items };
