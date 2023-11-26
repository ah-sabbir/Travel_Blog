import { path } from "@/constant";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";

interface Props {}

interface FormValues {
  query: string;
}

const SearchBar: FC<Props> = (props): JSX.Element => {
  const [expand, setExpand] = useState(false);
  const [placeholder, setPlaceholder] = useState("Tìm bài viết ...");
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      query: "",
    },
  });

  const { register, handleSubmit, formState, getValues } = form;

  const onBlur = () => {
    if (!getValues().query) {
      setExpand(false);
    }
    setPlaceholder("Tìm bài viết ...");
  };

  const onSubmit = (data: FormValues) => {
    if (!data.query || !data.query.trim()) {
      return;
    }

    console.log(data.query);

    router.push(`${path.search}?tu-khoa=${data.query}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex items-center ${
        expand ? "w-[240px]" : "w-[180px]"
      } w-[180px] h-[32px] bg-light_gray rounded-[17px] text-black_text transition-width`}
    >
      <input
        className="w-[148px] h-full py-1 bg-transparent outline-none px-4 font-black placeholder:text-black_text placeholder:font-black hover:placeholder:opacity-60 transition"
        placeholder={placeholder}
        onFocus={() => {
          setExpand(true);
          setPlaceholder("");
        }}
        {...register("query", { onBlur, required: true })}
      />

      <button
        type="submit"
        className="hover:opacity-70 ml-auto grid place-items-center w-[32px] h-full rounded-full bg-[radial-gradient(circle,#e3e3e3_60%,rgba(255,255,255,0)_60%)] transition"
      >
        <IoSearchOutline className="" />
      </button>
    </form>
  );
};

export default SearchBar;
