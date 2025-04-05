import UserForm from "../crud/Adminform";
import LeadForm from "../crud/LeadsForm";
import LedgerForm from "../crud/LedgerForm";
import ManageRoleForm from "../crud/Roleform";
import Productform from "../crud/ProductForm";
import UOMForm from "../crud/product/UOMForm";
import Packingform from "../crud/PackingForm";
import BillingForm from "../crud/BillingForm";
import PaymentForm from "../crud/PaymentForm";
import PurchaseForm from "../crud/PurchaseForm";
import QuotationForm from "../crud/QuotationForm";
import BrandForm from "../crud/product/BrandForm";
import WarehouseForm from "../crud/WareHouseForm";
import CategoryForm from "../crud/product/CategoryForm";
import ConfirmationModal from "../crud/ConfirmationModal";
import StockTransferForm from "../crud/StockTransferForm";
import ContactForm from "../crud/ContactForm";
import LoanForm from "../crud/LoanForm";
import NewsLetterForm from "../crud/NewsletterForm";
import TestimonialsForm from "../crud/TestimonialsForm";
import BlogForm from "../crud/Blogs";
import FaqsForm from "../crud/FaqsForm";
import BannersForm from "../crud/BannersForm";
import CallBackForm from "../crud/CallBackForm";

interface FormRendererProps {
  data: any;
  onClose?: any;
  formType: string;
  setPaginate?: any;
  setFilteredData?: any;
}

const FormRenderer: React.FC<FormRendererProps> = (props: any) => {
  switch (props.formType) {
    case "Employee":
      return <UserForm {...props} />;
    case "Billing":
      return <BillingForm {...props} />;
    case "Packing":
      return <Packingform {...props} />;
    case "Product":
      return <Productform {...props} />;
    case "Brand":
      return <BrandForm {...props} />;
    case "Category":
      return <CategoryForm {...props} />;
    case "Delete":
      return <ConfirmationModal {...props} />;
    case "Leads":
      return <LeadForm {...props} />;
    case "Eligible":
      return <LeadForm {...props} />;
    case "NotEligible":
      return <LeadForm {...props} />;
    case "PendingLeads":
      return <LeadForm {...props} />;
    case "CallBack":
      return <CallBackForm {...props} />;
    case "Contacts":
      return <ContactForm {...props} />;
    case "Loan":
      return <LoanForm {...props} />;
    case "ApprovedLoan":
      return <LoanForm {...props} />;
    case "DisapprovedLoan":
      return <LoanForm {...props} />;
    case "InProgressLoan":
      return <LoanForm {...props} />;
    case "Ledger":
      return <LedgerForm {...props} />;
    case "Purchase":
      return <PurchaseForm {...props} />;
    case "Payment":
      return <PaymentForm {...props} />;
    case "Role":
      return <ManageRoleForm {...props} />;
    case "UOM":
      return <UOMForm {...props} />;
    case "StockTransfer":
      return <StockTransferForm {...props} />;
    case "Warehouse":
      return <WarehouseForm {...props} />;
    case "Quotation":
      return <QuotationForm {...props} />;
    case "Newsletter":
      return <NewsLetterForm {...props} />;
    case "Faqs":
      return <FaqsForm {...props} />;
    case "Testimonials":
      return <TestimonialsForm {...props} />;
    case "Banners":
      return <BannersForm {...props} />;
    case "Blogs":
      return <BlogForm {...props} />;
    default:
      return <div>No Form Exist</div>;
  }
};

export default FormRenderer;
