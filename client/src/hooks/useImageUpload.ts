import axios from "axios";

export const useImageUpload = () => {
  const handleImageUpload = async (
    file: File,
    callbackFn: (url: string, altText: string) => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      callbackFn(response.data.url, file.name);
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { handleImageUpload };
};
