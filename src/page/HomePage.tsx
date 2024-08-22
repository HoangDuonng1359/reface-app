import { useEffect } from "react";
import Navigation from "../component/Navigation";
import { Card } from "antd";

const { Meta } = Card;

export const HomePage = () => {
    useEffect(() => {
        document.title = 'Reface';
    }, []);

    return (
        <div className="bg-gray-blue h-screen w-screen">
            <div className="bg-transparent w-full">
                <Navigation page='home'></Navigation>
            </div>
            <div>
                <div>
                    <div className="m-10 flex flex-col md:flex-row">
                        <div className="m-16">
                            <a className="w-auto h-auto" href="/reface">
                                <div className="w-full h-full">
                                <Card
                                    hoverable
                                    style={{ width: '320px'}}
                                    cover={<img alt="example" src="/img/faceswap_default.webp" />}
                                    
                                >
                                <Meta title="Reface" description="swap your face" />
                                </Card>
                                </div>
                            </a>
                        </div>
                        <div className="order-first h-1/2 m-16 text-3xl text-white text-center font-sans">Unleash your creativity with our face swap app!<br></br> Try new looks and have fun!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}