import { EnhancerBuilder } from "@uniformdev/canvas";
import { enhancerDefinition as bigcommerceEnhancerDef } from "./bigCommerceEnhancer";

const enhancerDefs = [bigcommerceEnhancerDef];

export async function getEnhancers() {
  const enhancerBuilder = new EnhancerBuilder();

  const promises = enhancerDefs.map((def) => {
    const { errors } = def.getConfiguration();
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `⚠️  ${
          def.name
        } enhancer is not configured and is therefore disabled. Check the following env vars: ${errors.join(
          ", "
        )}`
      );
    }

    // eslint-disable-next-line no-console
    console.log(`✅  ${def.name} enhancer is configured and enabled.`);
    return def.getEnhancer();
  });

  const resolved = await Promise.allSettled(promises);
  resolved.forEach((promise, index) => {
    const def = enhancerDefs[index];
    if (promise.status === "fulfilled") {
      enhancerBuilder.parameterType(def.parameterTypes, promise.value);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `⚠️  There was a problem loading the enhancer for ${def.name}: ${promise.reason}`
      );
    }
  });

  return enhancerBuilder;
}
