// React Hooks
import { useForm } from "react-hook-form";
// Cabin Custome Hook
import { useCreateCabin } from "./useCreateCabin";
import { useEditingCabins } from "./useEditingCabins";
// UI
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ CabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = CabinToEdit;
  const isEditSession = Boolean(editId);
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditingCabins();
  const isWorking = isCreating || isEditing;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    // Handle image correctly
    const image =
      typeof data.image === "string"
        ? data.image
        : data.image?.[0] ?? CabinToEdit.image ?? null;

    const cabinPayload = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount),
      image,
    };

    if (isEditSession) {
      editCabin(
        { newCabinData: cabinPayload, id: editId },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(cabinPayload, { onSuccess: () => reset() });
    }
  }

  function onError(errors) {
    console.log("Form validation errors:", errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* Cabin Name */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          id="name"
          type="text"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      {/* Max Capacity */}
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          id="maxCapacity"
          type="number"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </FormRow>

      {/* Regular Price */}
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          id="regularPrice"
          type="number"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price must be at least 1" },
          })}
        />
      </FormRow>

      {/* Discount */}
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          id="discount"
          type="number"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount must be less than or equal to regular price",
          })}
        />
      </FormRow>

      {/* Description */}
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      {/* Image */}
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      {/* Buttons */}
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Cancel
        </Button>

        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
