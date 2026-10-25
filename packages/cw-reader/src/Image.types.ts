// prettier-ignore
export namespace ComfyUIExportImage {
    export type Root = {
        last_node_id?: number;
        last_link_id?: number;
        state?: Config;
        id?: string;
        revision?: number;
        nodes:        Node[];
        links?:       Array<Array<number | string> | Link>;
        groups?:      any[];
        config?:      Config | null;
        extra?:       Config | null;
        version:      number;
        definitions?: Definitions;
    }

    export type Definitions = {
        subgraphs?: SubgraphDefinition[];
    }

    export type SubgraphDefinition = Root & {
        id:        string;
        revision:  number;
        name:      string;
        inputNode: Config;
        outputNode: Config;
        inputs?:   Input[];
        outputs?:  Output[];
        widgets?:  unknown[];
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
        widgets_values?: Array<unknown> | Record<string, unknown>;
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
        id?: string;
        name: string;
        type: string | string[] | number;
        link?: number | string | null;
        linkIds?: number[];
        shape?: number;
        localized_name?: string;
        label?: string;
        widget?: { name?: string } & Record<string, unknown>;
    }
    
    export type Output = {
        name:       string;
        type:       string | string[] | number;
        links?:     number[] | null;
        linkIds?:   number[];
        slot_index?: number;
        localized_name?: string;
        label?: string;
    }
    
    export type Properties = any;
    
}
