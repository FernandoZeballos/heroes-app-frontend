import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface BreadcrumbProps {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumbs?: BreadcrumbProps[];
}

export const CustomBreadcrum = ({ currentPage, breadcrumbs = [] }: Props) => {
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((breadcrumb) => (
          <div className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem key={breadcrumb.to}>
              <BreadcrumbLink asChild>
                <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
