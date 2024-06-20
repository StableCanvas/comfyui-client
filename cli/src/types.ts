export type WorkflowNodeInputRef = [ref_index: number, ref_outputs: number];
export type WorkflowNodeInputValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | WorkflowNodeInputRef;
export type WorkflowNodeDefine = {
  index: number | string;
  class_type: string;
  inputs: Record<string, WorkflowNodeInputValue>;
};
export type WorkflowNode = {
  index: number;

  data: {
    class_type: string;
    inputs: Record<string, WorkflowNodeInputValue>;
    outputs: string[];
  };
};
