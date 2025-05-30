// prettier-ignore
export namespace ComfyUIExportImage {
    export type Root = {
        last_node_id: number;
        last_link_id: number;
        nodes:        Node[];
        links:        Array<Array<number | string>>;
        groups:       any[];
        config:       Config;
        extra:        Config;
        version:      number;
    }
    
    export type Config = {
    }
    
    export type Node = {
        id:              number;
        type:            string;
        pos:             number[];
        size:            { [key: string]: number };
        flags:           Config;
        order:           number;
        mode:            number;
        inputs?:         Input[];
        outputs?:        Output[];
        properties:      Properties;
        widgets_values?: Array<number | string>;
    }
    
    export type Input = {
        name: string;
        type: string;
        link: number;
    }
    
    export type Output = {
        name:       string;
        type:       string;
        links:      number[];
        slot_index: number;
    }
    
    export type Properties = any;
    
}
