import { useEffect, useRef, useState } from "react";
import Navigation from "../component/Navigation"
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import axios, { Axios } from "axios";

export const Reface = () => {
    useEffect(() => {
        document.title = 'Reface';
    }, []);
    const inputFaceRef = useRef<HTMLInputElement>(null)
    const [stateUploadFaceImg, setStateUpLoadFaceImg] = useState(false)
    const handleUploadImg = () => {
        inputFaceRef.current?.click();
        setStateUpLoadFaceImg(true);
    }

    const [faceImgInput, setFaceImgInput] = useState("https://faceswap.sirv.com/Images/Icons_image.png");
    const handleFaceImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result == 'string') {
                    setFaceImgInput(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const inputTargetRef = useRef<HTMLInputElement>(null)
    const [stateUploadTargetImg, setStateUpLoadTargetImg] = useState(false)
    const handleUploadTargetImg = () => {
        inputTargetRef.current?.click();
        setStateUpLoadTargetImg(true);
    }
    const [targetImgInput, setTargetImgInput] = useState("https://faceswap.sirv.com/Images/Icons_image.png");
    const handleTargetImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result == 'string') {
                    setTargetImgInput(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const [resultImg, setResultImg] = useState("/img/faceswap_default.webp");
    const [currentMode, setCurrentMode] = useState('face swap');
    const handleOnChangeMode = (mode: string) => {
        setCurrentMode(mode);
    };

    const [loading, setLoading] = useState(false);
    const handleProcess = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const face = faceImgInput.split(',')[1]
        const target = targetImgInput.split(',')[1]
        try {
            const res = await axios.post('http://127.0.0.1:5000/swapFace', {
                "face_img": face,
                "target_img": target
            }
            );
            let resultImgBase64: string = res.data.result_img;
            let imgSrc: string = "data:image/jpeg;base64," + resultImgBase64;
            setResultImg(imgSrc)
            console.log(resultImgBase64);

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }
    return (
        <div className="bg-gray-blue h-full min-h-screen">
            <div className="fixed bg-transparent w-full top-0">
                <Navigation page='tools' />
            </div>
            <div className="">
                <div className="pt-10">
                    <h2 className="text-white font-semibold text-3xl pt-3 mx-auto text-center tracking-wide mb-10">Face Swap</h2>
                </div>
                <div className="flex flex-col md:flex-row mx-auto max-w-screen-lg w-full pb-6 px-4 gap-x-4 gap-y-6">
                    <div className="order-2 md:order-1 md:basis-2/3 flex flex-col w-full bg-white/[0.05] rounded-3xl backdrop-blur-sm p-4">
                        <div className="flex flex-row justify-center w-full gap-x-4 mb-2">
                            <span
                                onClick={() => handleOnChangeMode('face swap')}
                                className={`text-xs md:text-sm px-4 py-2 cursor-pointer flex items-center max-w-34 rounded-full ${currentMode === 'face swap' ? 'text-white' : 'text-white/[0.4]'
                                    }`}
                            >
                                Face swap
                            </span>
                            <span
                                onClick={() => handleOnChangeMode('history')}
                                className={`text-xs md:text-sm px-4 py-2 cursor-pointer flex items-center max-w-34 rounded-full ${currentMode === 'history' ? 'text-white' : 'text-white/[0.4]'
                                    }`}
                            >
                                My History
                            </span>
                        </div>
                        {(currentMode === 'face swap') && (
                            <div className="h-full">
                                <img className="h-height-image rounded-2xl mx-auto object-contain" src={resultImg} alt="" ></img>
                            </div>
                        )}
                    </div>
                    <div className="order-1 md:order-2 md:basis-1/3 overflow-y-auto md:h-height-panel">
                        <div className="flex flex-col p-4">
                            <div className="flex flex-col">
                                <p className="text-white text-sm">Add Face Image</p>
                                <p className="text-xs text-white/60">Take face from this image</p>
                                <button onClick={handleUploadImg} type="button" className="m-2 h-44 text-white/[0.6] hover:text-white border border-dashed border-white/[.2] bg-white/[.04] hover:bg-white/[.1] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center bg-contain bg-center bg-no-repeat mb-3">
                                    <div className="flex flex-col gap-y-1 justify-center items-center" >
                                        <img src={faceImgInput} alt="add image icon" className="max-h-44 w-auto h-auto" />
                                        {!stateUploadFaceImg && (
                                            <div>
                                                <span className="font-normal text-white text-sm">Add your image</span>
                                                <span className="text-xs text-white">JPG / PNG</span>
                                            </div>
                                        )}
                                        <input onChange={handleFaceImageChange} ref={inputFaceRef} type="file" style={{ display: 'none' }} accept="image/*"></input>
                                    </div>
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm">Add Target Image</p>
                                <p className="text-xs text-white/60">Swap face in this image</p>
                                <button onClick={handleUploadTargetImg} type="button" className="m-2 h-44 text-white/[0.6] hover:text-white border border-dashed border-white/[.2] bg-white/[.04] hover:bg-white/[.1] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center bg-contain bg-center bg-no-repeat mb-3">
                                    <div className="flex flex-col gap-y-1 justify-center items-center" >
                                        <img src={targetImgInput} alt="add image icon" className="max-h-44 w-auto h-auto" />
                                        {!stateUploadTargetImg && (
                                            <div>
                                                <span className="font-normal text-white text-sm">Add your image</span>
                                                <span className="text-xs text-white">JPG / PNG</span>
                                            </div>
                                        )}
                                        <input onChange={handleTargetImageChange} ref={inputTargetRef} type="file" style={{ display: 'none' }} accept="image/*"></input>
                                    </div>
                                </button>
                            </div>
                            <div className="text-center pb-4 md:pb-0">
                                <button onClick={handleProcess} type="button"
                                    className="w-full 
                        text-white bg-gradient-to-r 
                        from-blue-500 via-blue-600 
                        to-blue-700 hover:bg-gradient-to-br 
                        focus:ring-4 
                        focus:outline-none 
                        focus:ring-blue-300 
                        dark:focus:ring-blue-800 
                        font-medium rounded-full text-sm 
                        px-5 py-4 text-center mt-2 flex 
                        justify-center items-center">
                                    {loading && (
                                        <svg aria-hidden="true" role="status" viewBox="0 0 100 101"
                                            fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="inline w-4 h-4 mr-3 text-white animate-spin">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB">
                                            </path>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                        </svg>
                                    )}
                                    Start face swapping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}