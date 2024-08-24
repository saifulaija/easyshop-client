export const App_Name='EasyShop'
interface SideMenuItem {
  title: string;
  path: string;
  image: string; // URL to the image
  show?: boolean; // Optional property to control visibility
}


const sideMenuItems: SideMenuItem[] = [
  {
    title: "Home",
    path: "/",
    image: "/images/dashboard-icon.png",
    show: true, // This item will be visible
  },
  {
    title: "Sales Over Time:",
    path: "/sales_over_time",
    image: "/images/settings-icon.png",
    show: true, // This item will be visible
  },
  {
    title: "Sales Growth Rate",
    path: "/sales_growth_rate",
    image: "/images/messages-icon.png",
  },
  {
    title: "Customer Growth",
    path: "/customer_growth",
    image: "/images/profile-icon.png",
    show: false, // This item will be hidden
  },
  {
    title: "Repeat Customers",
    path: "/repeat_customers",
    image: "/images/profile-icon.png",
    show: false, // This item will be hidden
  },
  {
    title: "Customer Geography",
    path: "/customer_geography",
    image: "/images/profile-icon.png",
    show: false, // This item will be hidden
  },
  {
    title: "Cohort Lifetime Value",
    path: "/cohort_lifetime_value",
    image: "/images/profile-icon.png",
    show: false, // This item will be hidden
  },
];

export default sideMenuItems;
