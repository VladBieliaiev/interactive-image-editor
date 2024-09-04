import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setImage,
  setRotation,
  setScale,
  setFilter,
} from "../redux/editorSlice";
import { RootState } from "../redux/store";

const ImageUpload: React.FC = () => {
  const image = useSelector((state: RootState) => state.editor.image);
  const rotation = useSelector((state: RootState) => state.editor.rotation);
  const scale = useSelector((state: RootState) => state.editor.scale);
  const filter = useSelector((state: RootState) => state.editor.filter);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filters = ["none", "grayscale", "blur"];
  const dispatch = useDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setImage(e.target?.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotateImage = () => {
    const newRotation = (rotation + 90) % 360;
    dispatch(setRotation(newRotation));
  };

  const handleScaleImage = (factor: number) => {
    const newScale = scale + factor;
    dispatch(setScale(newScale));
  };

  const handleApplyFilter = (filterName: string) => {
    if (filterName === "grayscale") {
      dispatch(setFilter(filterName + "(100%)"));
    }
    if (filterName === "blur") {
      dispatch(setFilter(filterName + "(5px)"));
    }
    if (filterName === "none") {
      dispatch(setFilter(filterName));
    }
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const desiredWidth = 250;
          const desiredHeight = 250;
          canvas.width = desiredWidth;
          canvas.height = desiredHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.scale(scale, scale);
          ctx.filter = filter !== "none" ? filter : "none";
          ctx.drawImage(
            img,
            -desiredHeight / 2,
            -desiredWidth / 2,
            desiredHeight,
            desiredWidth
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        };
      }
    }
  }, [image, rotation, scale, filter]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} />
      <button onClick={handleRotateImage}>Rotate Image</button>
      <button onClick={() => handleScaleImage(0.1)}>Zoom in</button>
      <button onClick={() => handleScaleImage(-0.1)}>Zoom out</button>
      <select onChange={(e) => handleApplyFilter(e.target.value)}>
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ImageUpload;
