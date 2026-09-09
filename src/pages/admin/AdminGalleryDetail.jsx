import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ImagePlus,
  Images,
  UploadCloud,
  CheckCircle2,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";

/* -------------------------------------------------------
   LAZY IMAGE
------------------------------------------------------- */

const LazyImage = ({
  src,
  alt = "",
  className = "",
  wrapperClassName = "",
}) => {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = src;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "150px",
      }
    );

    const element = document.getElementById(
      `lazy-${src.replace(/[^a-zA-Z0-9]/g, "")}`
    );

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      id={`lazy-${src.replace(/[^a-zA-Z0-9]/g, "")}`}
      className={`relative overflow-hidden ${wrapperClassName}`}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <ImageIcon size={20} className="text-zinc-700" />
        </div>
      )}

      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`${className} ${
            loaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------- */

const AdminGalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [previews, setPreviews] = useState([]);

  /* -------------------------------------------------------
     LOAD GALLERY
  ------------------------------------------------------- */

  const load = async () => {
    try {
      setPageLoading(true);

      const res = await API.get(`/gallery/admin/${id}`);

      setGallery(res.data);
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  /* -------------------------------------------------------
     SELECT FILES
  ------------------------------------------------------- */

  const handleFiles = (e) => {
    const files = [...e.target.files];

    if (!files.length) return;

    setImages(files);

    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(newPreviews);
  };

  /* -------------------------------------------------------
     REMOVE SELECTED PREVIEW
  ------------------------------------------------------- */

  const removePreview = (index) => {
    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));

    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* -------------------------------------------------------
     CLEAR FILES
  ------------------------------------------------------- */

  const clearFiles = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));

    setImages([]);
    setPreviews([]);
  };

  /* -------------------------------------------------------
     UPLOAD
  ------------------------------------------------------- */

  const addImages = async () => {
    if (images.length === 0) {
      toast.error("Please select images first");
      return;
    }

    setLoading(true);
    setProgress(0);

    const fd = new FormData();

    images.forEach((img) => {
      fd.append("images", img);
    });

    try {
      await API.post(`/gallery/admin/${id}/images`, fd, {
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(
              Math.round((e.loaded * 100) / e.total)
            );
          }
        },
      });

      toast.success(`${images.length} images uploaded successfully`);

      clearFiles();

      await load();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  /* -------------------------------------------------------
     LOADING UI
  ------------------------------------------------------- */

  if (pageLoading) {
    return (
      <div className="min-h-screen space-y-8 animate-pulse">

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-zinc-900" />

          <div className="space-y-2">
            <div className="h-7 w-64 bg-zinc-900 rounded-lg" />
            <div className="h-4 w-40 bg-zinc-900 rounded" />
          </div>
        </div>

        <div className="h-72 bg-zinc-900 rounded-3xl" />

        <div className="h-72 bg-zinc-900 rounded-3xl" />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-40 bg-zinc-900 rounded-2xl"
            />
          ))}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------
     NO GALLERY
  ------------------------------------------------------- */

  if (!gallery) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">

        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-5">
          <Images
            size={28}
            className="text-zinc-600"
          />
        </div>

        <h2 className="text-xl font-bold text-white">
          Gallery not found
        </h2>

        <p className="text-sm text-zinc-500 mt-2 mb-6">
          This gallery may have been removed.
        </p>

        <button
          onClick={() => navigate("/admin/gallery")}
          className="
            flex items-center gap-2
            px-5 py-3
            rounded-xl
            bg-orange-500
            text-black
            font-bold
            hover:bg-orange-400
            transition
          "
        >
          <ArrowLeft size={17} />
          Back to Gallery
        </button>
      </div>
    );
  }

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-8">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex flex-col md:flex-row
          md:items-center
          justify-between
          gap-5
        "
      >
        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/admin/gallery")}
            className="
              w-11 h-11
              rounded-xl
              bg-zinc-900
              border border-white/10
              flex items-center justify-center
              text-zinc-400
              hover:text-white
              hover:border-orange-500/40
              hover:bg-orange-500/5
              transition
            "
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <div className="flex items-center gap-3">

              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                {gallery.title}
              </h1>

              <span
                className="
                  hidden sm:inline-flex
                  items-center gap-1.5
                  px-2.5 py-1
                  rounded-full
                  bg-green-500/10
                  border border-green-500/20
                  text-green-400
                  text-[11px]
                  font-bold
                  uppercase
                "
              >
                <CheckCircle2 size={11} />
                Active
              </span>

            </div>

            <div className="flex items-center gap-2 mt-1.5 text-sm text-zinc-500">

              <Images size={14} />

              <span>
                {gallery.images?.length || 0} gallery images
              </span>

            </div>
          </div>
        </div>

        {/* HEADER ACTION */}

        <button
          onClick={() => {
            document
              .getElementById("upload-section")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
          }}
          className="
            inline-flex items-center justify-center gap-2
            px-5 py-3
            rounded-xl
            bg-orange-500
            text-black
            font-black
            text-sm
            shadow-lg shadow-orange-500/10
            hover:bg-orange-400
            hover:-translate-y-0.5
            transition
          "
        >
          <ImagePlus size={17} />
          Add Images
        </button>
      </div>

      {/* ===================================================
          COVER CARD
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-zinc-950
          shadow-2xl
        "
      >

        <div className="relative h-[260px] md:h-[350px]">

          <img
            src={gallery.cover?.url}
            alt={gallery.title}
            fetchPriority="high"
            decoding="async"
            className="
              w-full
              h-full
              object-cover
            "
          />

          {/* DARK OVERLAY */}

          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black via-black/30 to-transparent
            "
          />

          {/* COVER INFO */}

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">

            <span
              className="
                inline-flex
                px-3 py-1
                rounded-full
                bg-orange-500
                text-black
                text-[10px]
                font-black
                uppercase
                tracking-widest
                mb-3
              "
            >
              Cover Image
            </span>

            <h2 className="text-2xl md:text-3xl font-black text-white">
              {gallery.title}
            </h2>

            <p className="text-sm text-zinc-300 mt-1">
              Event gallery cover
            </p>

          </div>
        </div>
      </section>

      {/* ===================================================
          UPLOAD SECTION
      =================================================== */}

      <section
        id="upload-section"
        className="
          rounded-3xl
          border border-white/10
          bg-zinc-950
          p-5 md:p-7
          shadow-xl
        "
      >

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          <div>
            <div className="flex items-center gap-2">

              <div
                className="
                  w-9 h-9
                  rounded-xl
                  bg-orange-500/10
                  border border-orange-500/20
                  flex items-center justify-center
                "
              >
                <UploadCloud
                  size={18}
                  className="text-orange-400"
                />
              </div>

              <h3 className="font-black text-lg text-white">
                Upload Images
              </h3>

            </div>

            <p className="text-xs text-zinc-500 mt-2">
              Add multiple event images to this gallery
            </p>
          </div>

          {images.length > 0 && (
            <span
              className="
                text-xs
                font-bold
                px-3 py-1.5
                rounded-full
                bg-orange-500/10
                text-orange-400
                border border-orange-500/20
              "
            >
              {images.length} selected
            </span>
          )}

        </div>

        {/* DROP AREA */}

        <label className="cursor-pointer block">

          <div
            className={`
              relative
              min-h-[150px]
              rounded-2xl
              border-2
              border-dashed
              flex flex-col
              items-center
              justify-center
              gap-3
              transition
              ${
                previews.length
                  ? "border-orange-500/40 bg-orange-500/[0.03]"
                  : "border-white/10 hover:border-orange-500/30 hover:bg-white/[0.02]"
              }
            `}
          >

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-zinc-900
                border border-white/10
                flex items-center justify-center
              "
            >
              <ImagePlus
                size={22}
                className={
                  previews.length
                    ? "text-orange-400"
                    : "text-zinc-600"
                }
              />
            </div>

            {previews.length ? (
              <>
                <p className="text-sm font-bold text-orange-400">
                  {images.length} images selected
                </p>

                <p className="text-xs text-zinc-600">
                  Click to choose different images
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-zinc-400">
                  Select images to upload
                </p>

                <p className="text-xs text-zinc-600">
                  JPG, PNG, WEBP and other image formats
                </p>
              </>
            )}

          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFiles}
          />

        </label>

        {/* =================================================
            PREVIEWS
        ================================================= */}

        {previews.length > 0 && (
          <div className="mt-5">

            <div className="flex items-center justify-between mb-3">

              <p className="text-xs uppercase tracking-wider font-bold text-zinc-500">
                Selected Images
              </p>

              <button
                onClick={clearFiles}
                disabled={loading}
                className="
                  text-xs
                  text-zinc-500
                  hover:text-red-400
                  transition
                "
              >
                Clear all
              </button>

            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">

              {previews.map((preview, index) => (
                <div
                  key={preview}
                  className="
                    relative
                    aspect-square
                    rounded-xl
                    overflow-hidden
                    bg-zinc-900
                    border border-white/10
                    group
                  "
                >

                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <button
                    onClick={() => removePreview(index)}
                    disabled={loading}
                    className="
                      absolute
                      top-1.5
                      right-1.5
                      w-7 h-7
                      rounded-lg
                      bg-black/70
                      backdrop-blur
                      flex items-center justify-center
                      text-white
                      opacity-0
                      group-hover:opacity-100
                      transition
                      hover:bg-red-500
                    "
                  >
                    <X size={13} />
                  </button>

                </div>
              ))}

            </div>
          </div>
        )}

        {/* =================================================
            PROGRESS
        ================================================= */}

        {loading && (
          <div className="mt-6">

            <div className="flex justify-between items-center mb-2">

              <div className="flex items-center gap-2">

                <Loader2
                  size={14}
                  className="animate-spin text-orange-400"
                />

                <span className="text-xs font-bold text-zinc-400">
                  Uploading images...
                </span>

              </div>

              <span className="text-xs font-black text-orange-400">
                {progress}%
              </span>

            </div>

            <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">

              <div
                className="
                  h-full
                  bg-orange-500
                  rounded-full
                  transition-all
                  duration-300
                "
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>
          </div>
        )}

        {/* UPLOAD BUTTON */}

        <button
          onClick={addImages}
          disabled={loading || images.length === 0}
          className="
            mt-6
            w-full
            py-3.5
            rounded-xl
            bg-orange-500
            text-black
            font-black
            text-sm
            flex items-center justify-center gap-2
            hover:bg-orange-400
            hover:-translate-y-0.5
            transition
            disabled:opacity-30
            disabled:hover:translate-y-0
            disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />

              Uploading {progress}%
            </>
          ) : (
            <>
              <UploadCloud size={17} />

              Upload{" "}
              {images.length > 0
                ? `${images.length} `
                : ""}
              {images.length === 1 ? "Image" : "Images"}
            </>
          )}
        </button>

      </section>

      {/* ===================================================
          GALLERY IMAGES
      =================================================== */}

      <section>

        <div className="flex items-center justify-between mb-5">

          <div>

            <div className="flex items-center gap-2">

              <Images
                size={18}
                className="text-orange-400"
              />

              <h3 className="text-lg font-black text-white">
                Gallery Images
              </h3>

            </div>

            <p className="text-xs text-zinc-600 mt-1">
              {gallery.images?.length || 0} images in this gallery
            </p>

          </div>

        </div>

        {gallery.images?.length > 0 ? (

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-3
            "
          >

            {gallery.images.map((img, index) => (

              <div
                key={img._id}
                className="
                  group
                  relative
                  aspect-square
                  rounded-2xl
                  overflow-hidden
                  bg-zinc-950
                  border border-white/10
                  hover:border-orange-500/40
                  transition-all
                  duration-300
                "
              >

                <LazyImage
                  src={img.url}
                  alt={`Gallery image ${index + 1}`}
                  wrapperClassName="w-full h-full"
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-500
                  "
                />

                {/* IMAGE NUMBER */}

                <div
                  className="
                    absolute
                    left-2
                    bottom-2
                    px-2
                    py-1
                    rounded-lg
                    bg-black/60
                    backdrop-blur
                    text-[10px]
                    font-bold
                    text-white
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                >
                  #{index + 1}
                </div>

                {/* HOVER OVERLAY */}

                <div
                  className="
                    absolute inset-0
                    bg-black/20
                    opacity-0
                    group-hover:opacity-100
                    transition
                    pointer-events-none
                  "
                />

              </div>

            ))}

          </div>

        ) : (

          <div
            className="
              py-20
              rounded-3xl
              border border-dashed border-white/10
              bg-zinc-950
              flex flex-col
              items-center
              justify-center
              text-center
            "
          >

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-zinc-900
                border border-white/10
                flex items-center justify-center
                mb-4
              "
            >
              <Images
                size={25}
                className="text-zinc-700"
              />
            </div>

            <h4 className="text-sm font-bold text-zinc-400">
              No gallery images
            </h4>

            <p className="text-xs text-zinc-600 mt-1">
              Upload your first event images above.
            </p>

          </div>

        )}

      </section>

    </div>
  );
};

export default AdminGalleryDetail;