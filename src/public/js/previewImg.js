var inputImage = document.querySelector(".form-control-typeFile");
var imgPreview = document.querySelector(".preview-image img");
var imgProfile = document.querySelector(".img-card img");

if (inputImage) inputImage.addEventListener("change", showPreview);

/// Show image when upload
function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);

        if (imgProfile) {
            imgProfile.src = src;
            return;
        }

        imgPreview.src = src;

        return;
    }
    imgPreview.src = "";
    imgProfile.src = "";
}
