// prettier-ignore
export namespace ComfyUIExportImage {
    export type Root = {
        last_node_id?: number;
        last_link_id?: number;
        state?: Config;
        nodes:        Node[];
        links:        Array<Array<number | string> | Link>;
        groups:       any[];
        config:       Config;
        extra:        Config;
        version:      number;
    }
    
    export type Config = {
    }
    
    export type Node = {
        id:              number | string;
        type:            string;
        pos:             number[] | Record<string, number>;
        size:            number[] | { [key: string]: number };
        flags:           Config;
        order:           number;
        mode?:           number;
        inputs?:         Input[];
        outputs?:        Output[];
        properties:      Properties;
        widgets_values?: Array<number | string> | Record<string, unknown>;
        widgets_values_named?: Record<string, unknown>;
    }

    export type Link = {
        id: number;
        origin_id: number | string;
        origin_slot: number | string;
        target_id: number | string;
        target_slot: number | string;
        type: string | string[] | number;
        parentId?: number;
    }
    
    export type Input = {
        name: string;
        type: string;
        link?: number | string | null;
    }
    
    export type Output = {
        name:       string;
        type:       string;
        links?:     number[] | null;
        slot_index: number;
    }
    
    export type Properties = any;
    
}
