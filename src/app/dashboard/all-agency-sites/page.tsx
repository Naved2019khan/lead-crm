import { Heading } from "@/components/ui/Heading";
import { ProductGrid } from "@/components/grid/ProductGrid";
import { getAgencySites } from "@/services/api/product-api";
interface Site {
  siteId: string;
  siteName: string;
  siteDomain?: string;
  status?: "active" | "inactive";
}

async function Page() {
  let agencySites;
  let error;
  try {
    agencySites = await getAgencySites().then((res) => res.list);
    console.log(agencySites,"agencySites")
  } catch (e) {
    error = e.message;
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="mx-12 mt-4">
      <Heading level="h2" align="left" subtitle="Software Lead Section">
        XXXXX XXXXX XXX
      </Heading>
      <ProductGrid sites={agencySites} />
    </div>
  );
}

export default Page;
