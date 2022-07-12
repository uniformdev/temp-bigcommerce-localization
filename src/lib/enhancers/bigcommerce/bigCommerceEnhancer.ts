import {
  createEnhancer,
  BIGCOMMERCE_PARAMETER_TYPES,
  BigCommerceGqlClient,
} from '@uniformdev/canvas-bigcommerce-gql';
import { EnhancerDefinition } from '../types';
import { validateAndGetEnvVars } from '../utils';

export const enhancerDefinition: EnhancerDefinition = {
  name: 'BigCommerce',
  getConfiguration,
  getEnhancer,
  parameterTypes: BIGCOMMERCE_PARAMETER_TYPES,
};

function getConfiguration() {
  const config = validateAndGetEnvVars(['BIGCOMMERCE_STORE_HASH', 'BIGCOMMERCE_GQL_TOKEN']);

  return config;
}

function getEnhancer() {
  const { envVars } = getConfiguration();

  const client = new BigCommerceGqlClient({
    storeHash: envVars.BIGCOMMERCE_STORE_HASH,
    token: envVars.BIGCOMMERCE_GQL_TOKEN,
  });
  return createEnhancer({
    clients: client,
    options: {
      include: [
        'prices',
        'weight',
        'height',
        'width',
        'depth',
        'productOptions',
        'reviewSummary',
        'availabilityV2',
        'categories',
        'brand',
        'variants',
        'customFields',
        'images',
        'relatedProducts',
        'inventory',
        'metafields',
        'seo',
        'giftWrappingOptions',
        'defaultImage',
      ],
      include_fields: [
        'id',
        'entityId',
        'sku',
        'path',
        'name',
        'description',
        'plainTextDescription',
        'warranty',
        'minPurchaseQuantity',
        'maxPurchaseQuantity',
        'addToCartUrl',
        'type',
        'upc',
        'mpn',
        'gtin',
        'addToWishlistUrl',
        'availability',
        'availabilityDescription',
        'condition',
      ],
      // ability to pass meta fields you desire to extract
      // metafields_namespace: 'language',
    },
  });
}
