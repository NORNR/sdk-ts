export type OnboardingInput = {
  workspaceName: string;
  agentName: string;
  dailyLimitUsd?: number;
  requireApprovalOverUsd?: number;
  maxTransactionUsd?: number;
  counterpartyAllowlist?: string[];
  apiKeyLabel?: string;
};

export type PaymentIntentInput = {
  agentId: string;
  amountUsd: number;
  counterparty: string;
  destination?: string;
  purpose?: string;
};

export type DepositInput = {
  amountUsd: number;
  source?: string;
  externalReference?: string;
};

export type PayoutInput = {
  amountUsd: number;
  destination: string;
  memo?: string;
};

export type AgreementInput = {
  buyerAgentId: string;
  title: string;
  description?: string;
  counterpartyName: string;
  counterpartyDestination: string;
  milestones: Array<{ title: string; description?: string; amountUsd: number }>;
};

export type IdentityInput = {
  legalName: string;
  contactEmail: string;
  jurisdiction: string;
  entityType?: string;
  verificationStatus?: string;
};

export declare class AgentPayClient {
  constructor(input?: { baseUrl?: string; apiKey?: string | null });
  baseUrl: string;
  apiKey: string | null;
  withApiKey(apiKey: string): AgentPayClient;
  onboard(input: OnboardingInput): Promise<any>;
  getBootstrap(): Promise<any>;
  createAgent(input: { name: string; dailyLimitUsd?: number }): Promise<any>;
  createPolicy(agentId: string, input: Record<string, unknown>): Promise<any>;
  createPaymentIntent(input: PaymentIntentInput): Promise<any>;
  getIdentity(): Promise<any>;
  updateIdentity(input: IdentityInput): Promise<any>;
  getCompliance(): Promise<any>;
  getReputation(): Promise<any>;
  getPortableReputation(): Promise<any>;
  getSignedPortableReputation(): Promise<any>;
  exportAgreementStandard(): Promise<any>;
  exportSignedAgreementStandard(): Promise<any>;
  getAgreementStandardSchema(): Promise<any>;
  getEcosystemDirectory(): Promise<any>;
  getSignedEcosystemDirectory(): Promise<any>;
  validateInteropEnvelope(input: Record<string, unknown>): Promise<any>;
  listEvents(): Promise<any>;
  listWebhooks(): Promise<any>;
  createWebhook(input: Record<string, unknown>): Promise<any>;
  listWebhookDeliveries(): Promise<any>;
  drainWebhooks(): Promise<any>;
  exportAudit(): Promise<any>;
  listAgreements(): Promise<any>;
  createAgreement(input: AgreementInput): Promise<any>;
  submitMilestoneProof(agreementId: string, milestoneId: string, input: Record<string, unknown>): Promise<any>;
  releaseMilestone(agreementId: string, milestoneId: string): Promise<any>;
  disputeMilestone(agreementId: string, milestoneId: string, input: Record<string, unknown>): Promise<any>;
  resolveMilestone(agreementId: string, milestoneId: string, input: Record<string, unknown>): Promise<any>;
  getWallet(): Promise<any>;
  createDeposit(input: DepositInput): Promise<any>;
  createPayout(input: PayoutInput): Promise<any>;
  listSettlementJobs(): Promise<any>;
  runSettlement(): Promise<any>;
  getReconciliation(): Promise<any>;
  approveIntent(approvalId: string): Promise<any>;
  rejectIntent(approvalId: string): Promise<any>;
  listLedger(agentId: string): Promise<any>;
  listReceipts(agentId: string): Promise<any>;
  createApiKey(label: string): Promise<any>;
}
