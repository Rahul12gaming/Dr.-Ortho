import { Input } from "../../components/ui/input";
import type { FC } from "react";

const Demo:FC = () => {
    return (
        <div className="flex justify-around gap-10 py-10 px-4">
            <div className="space-y-3">
                <h1 className="text-4xl font-[600]">Get a live demo of Copy.ai</h1>
            </div>
            <div className="w-6/12 bg-gray-100 border-1 p-6 mt-4  ">
                <Input placeholder="Enter your Name"/>
            </div>
        </div>
    );
}

export default Demo;
