import { useEffect } from "react";
import Navigation from "../component/Navigation";
import { Card } from "antd";

const { Meta } = Card;

export const HomePage = () => {
    useEffect(() => {
        document.title = 'Reface';
    }, []);

    return (
        <div className="bg-gray-800 h-screen">
            <div className="bg-transparent w-full">
                <Navigation page='home'></Navigation>
            </div>
            <div>
                <div>
                    <div className="m-10 grid grid-cols-3">
                        <div className="m-16">
                            <a className="w-auto h-auto" href="/reface">
                            <Card
                                hoverable
                                style={{ width: '320px'}}
                                cover={<img alt="example" src="/img/faceswap_default.webp" />}
                            >
                            <Meta title="Reface" description="swap your face" />
                            </Card>
                            </a>
                        </div>
                        <div className="col-span-2 h-1/2 m-16 text-3xl text-white text-center font-sans">Unleash your creativity with our face swap app!<br></br> Try new looks and have fun!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}