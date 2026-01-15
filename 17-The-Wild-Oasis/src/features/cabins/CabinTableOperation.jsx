import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

const CabinTableOperation = () => {
  return (
    <TableOperations>
      <Filter
        filterFields="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperation;
