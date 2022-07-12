import { ComponentParameterEnhancer } from '@uniformdev/canvas';

export interface EnhancerDefinition {
  name: string;
  // note: we don't care or need to know what the enhancer value type is here, so `any` is ok.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEnhancer: () => Promise<ComponentParameterEnhancer<any>> | ComponentParameterEnhancer<any>;
  parameterTypes: readonly string[];
  getConfiguration: () => { envVars: Record<string, string>; errors: string[] };
}
