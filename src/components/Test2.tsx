import Anonlog from "./Anonlog";
import AWS from 'aws-sdk';
import { Suspense } from "react";

//Loads selected image and unencodes image bytes for Rekognition DetectFaces API
export default function Test2() {

    const element = document.getElementById("fileToUpload");
    element?.addEventListener("change", function (event: any) {test(); }, false);

        function test(){
    Anonlog();
    var control : any = document.getElementById("fileToUpload");
    var file = control?.files[0];

    // Load base64 encoded image for display 
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e: any) {
            //Call Rekognition  
            AWS.config.region = "eu-west-2";  
            var rekognition = new AWS.Rekognition();
            var params = {
                Image: {
                Bytes: e.target.result,
            },
            Attributes: [
            'ALL',
            ]
            };

            rekognition.detectFaces(params, function (err: any, data: any) {
                var ageRange : any = document.getElementById("opResult");
                if (err) console.log(err, err.stack);
                else {
                    var table = "<div>";
                    table += '<ul>Low : ' + data.FaceDetails[0].AgeRange.Low + '</ul>' +
                    '<ul>High : ' + data.FaceDetails[0].AgeRange.High + '</ul></div>';
                    ageRange.innerHTML = table;
                }
            });
        };
    })(file);
    reader.readAsArrayBuffer(file);
}

    const onselectedFile = () => {
        test();
    }

    return(
        <>
            <input type="file" name="fileToUpload" id="fileToUpload" accept='image/*' onChange={onselectedFile}/>
            <Suspense fallback={<div>Loading...</div>}>
                <p id="opResult"/>
            </Suspense>
        </>);
}