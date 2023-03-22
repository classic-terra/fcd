const {
  INDEXER_SERVER_PORT,
  INDEXER_CHAIN_ID,
  INDEXER_INITIAL_HEIGHT,
  INDEXER_LCD_URI,
  INDEXER_FCD_URI,
  INDEXER_RPC_URI,
  INDEXER_SENTRY_DSN,
  INDEXER_USE_LOG_FILE,
  INDEXER_DISABLE_API,
  INDEXER_EXCLUDED_ROUTES,
  INDEXER_MIN_GAS_PRICES,
  INDEXER_PRUNING_KEEP_EVERY,
  INDEXER_BANK_WALLETS,
  INDEXER_TOKEN_NETWORK,
  INDEXER_GENESIS_ACCOUNT_COUNT
} = process.env

const config = {
  ORM: 'default',
  CHAIN_ID: INDEXER_CHAIN_ID || 'pisco-1',
  INITIAL_HEIGHT: INDEXER_INITIAL_HEIGHT
    ? parseInt(INDEXER_INITIAL_HEIGHT)
    : INDEXER_CHAIN_ID !== 'columbus-5'
    ? 1
    : 4724001,
  SERVER_PORT: INDEXER_SERVER_PORT ? parseInt(INDEXER_SERVER_PORT) : 3060,
  LCD_URI:
    INDEXER_LCD_URI || INDEXER_CHAIN_ID !== 'columbus-5'
      ? 'https://pisco-lcd.terra.dev'
      : 'https://columbus-lcd.terra.dev',
  FCD_URI:
    INDEXER_FCD_URI || INDEXER_CHAIN_ID !== 'columbus-5'
      ? 'https://pisco-fcd.terra.dev'
      : 'https://columbus-fcd.terra.dev',
  RPC_URI: INDEXER_RPC_URI || 'http://localhost:26657',
  BANK_WALLETS: INDEXER_BANK_WALLETS ? (JSON.parse(INDEXER_BANK_WALLETS) as string[]) : [],
  TOKEN_NETWORK: INDEXER_TOKEN_NETWORK,
  SENTRY_DSN: INDEXER_SENTRY_DSN,
  USE_LOG_FILE: !!JSON.parse(INDEXER_USE_LOG_FILE || 'false'),
  DISABLE_API: !!JSON.parse(INDEXER_DISABLE_API || 'false'),
  // Chain parameters
  EXCLUDED_ROUTES: INDEXER_EXCLUDED_ROUTES
    ? (JSON.parse(INDEXER_EXCLUDED_ROUTES) as string[]).map((regExp) => new RegExp(regExp))
    : [],
  MIN_GAS_PRICES: INDEXER_MIN_GAS_PRICES
    ? (JSON.parse(INDEXER_MIN_GAS_PRICES) as DenomMap)
    : ({
        uluna: '5.0'
      } as DenomMap),
  PRUNING_KEEP_EVERY: parseInt(INDEXER_PRUNING_KEEP_EVERY || '100', 10) || 100,
  GENESIS_ACCOUNT_COUNT: parseInt(INDEXER_GENESIS_ACCOUNT_COUNT || '0', 10) || 0
}

export default config
