import { Wrench, Truck, Shield, Package, Layers, Settings } from "lucide-react";

export const categories = [
    { icon: Truck, label: "FORD", brands: ["Ford", "F-150", "F-250", "F-350", "F-450", "F-550"] },
    { icon: Truck, label: "GMC / CHEVY", brands: ["GMC", "Chevrolet", "Chevy", "Sierra", "Silverado"] },
    { icon: Truck, label: "RAM", brands: ["RAM", "Dodge", "1500", "2500", "3500"] },
    { icon: Truck, label: "TOYOTA", brands: ["Toyota", "Tundra", "Tacoma"] },
    { icon: Layers, label: "SERVICE BODIES", brands: ["Service", "Utility", "Knapheide", "Reading", "Royal"] },
    { icon: Layers, label: "DUMP BODIES", brands: ["Dump", "Landscape", "Tipper"] },
    { icon: Settings, label: "ACCESSORIES", brands: ["Box", "Toolbox", "Mount", "Light"] },
    { icon: Settings, label: "OTHER", brands: [] },
];
