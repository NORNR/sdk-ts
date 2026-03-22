export type OnboardingInput = {
  workspaceName: string;
  agentName: string;
  dailyLimitUsd?: number;
  requireApprovalOverUsd?: number;
  maxTransactionUsd?: number;
  counterpartyAllowlist?: string[];
  autoPauseOnAnomaly?: boolean;
  apiKeyLabel?: string;
  apiKeyTemplateId?: string;
  apiKeyScopes?: string[];
};

export type PaymentIntentInput = {
  agentId: string;
  amountUsd: number;
  counterparty: string;
  destination?: string;
  budgetTags?: Record<string, string>;
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
  budgetTags?: Record<string, string>;
  memo?: string;
};

export type AgreementInput = {
  buyerAgentId: string;
  title: string;
  description?: string;
  counterpartyName: string;
  counterpartyDestination: string;
  budgetTags?: Record<string, string>;
  milestones: Array<{ title: string; description?: string; amountUsd: number }>;
};

export type IdentityInput = {
  legalName: string;
  contactEmail: string;
  jurisdiction: string;
  entityType?: string;
  verificationStatus?: string;
};

export type TrustHandshakeInput = {
  envelope: Record<string, unknown>;
  minTier?: string;
  minScore?: number;
};

export type WalletCreateInput = {
  owner: string;
  dailyLimit?: number;
  baseUrl?: string;
  workspaceName?: string;
  requireApprovalAbove?: number;
  maxTransaction?: number;
  whitelist?: string[];
  autoPauseOnAnomaly?: boolean;
  reviewOnAnomaly?: boolean;
  startingBalance?: number;
};

export type WalletPayInput = {
  amount: number;
  to: string;
  purpose?: string;
  counterparty?: string;
  budgetTags?: Record<string, string>;
  dryRun?: boolean;
  businessContext?: Record<string, unknown>;
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
  listPolicyTemplates(): Promise<any>;
  listPolicyPacks(): Promise<any>;
  getPolicyPack(packId: string): Promise<any>;
  replayPolicyPack(packId: string, input: Record<string, unknown>): Promise<any>;
  applyPolicyPack(packId: string, input: Record<string, unknown>): Promise<any>;
  rollbackPolicyPack(packId: string, input?: Record<string, unknown>): Promise<any>;
  listApiKeyTemplates(): Promise<any>;
  listBudgetCaps(): Promise<any>;
  createBudgetCap(input: Record<string, unknown>): Promise<any>;
  simulatePolicy(input: Record<string, unknown>): Promise<any>;
  diffPolicy(input: Record<string, unknown>): Promise<any>;
  listAnomalies(): Promise<any>;
  updateAnomaly(anomalyId: string, input: Record<string, unknown>): Promise<any>;
  createPaymentIntent(input: PaymentIntentInput): Promise<any>;
  getIdentity(): Promise<any>;
  updateIdentity(input: IdentityInput): Promise<any>;
  getCompliance(): Promise<any>;
  getReputation(): Promise<any>;
  getTrustProfile(): Promise<any>;
  getTrustTiers(): Promise<any>;
  getTrustManifest(): Promise<any>;
  getSignedTrustManifest(): Promise<any>;
  verifyTrustManifest(input: Record<string, unknown>): Promise<any>;
  handshakeTrustManifest(input: TrustHandshakeInput): Promise<any>;
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
  listWorkspaceAccessLinks(): Promise<any>;
  createWorkspaceAccessLink(input: Record<string, unknown>): Promise<any>;
  listWebhookDeliveries(): Promise<any>;
  drainWebhooks(): Promise<any>;
  testWebhook(endpointId: string, input?: Record<string, unknown>): Promise<any>;
  replayWebhook(endpointId: string, input: Record<string, unknown>): Promise<any>;
  exportAudit(): Promise<any>;
  getAuditReview(input?: { format?: "json" | "markdown" }): Promise<any>;
  getCostReport(input?: { format?: "json" | "csv" }): Promise<any>;
  exportCostReport(format?: "json" | "csv"): Promise<any>;
  getMonthlyStatement(month?: string): Promise<any>;
  getCloseBundle(month?: string, input?: { format?: "json" | "markdown" }): Promise<any>;
  getArtifactEvidence(month?: string): Promise<any>;
  compareCloseBundles(input: { left: string; right: string }): Promise<any>;
  verifyCloseBundleManifest(input: Record<string, unknown>): Promise<any>;
  getSignedCloseBundleManifest(month?: string): Promise<any>;
  listCounterpartyProfiles(): Promise<any>;
  getCounterpartyProfile(profileId: string): Promise<any>;
  listPolicyAuthoringDrafts(input?: { includeArchived?: boolean }): Promise<any>;
  getPolicyAuthoringDraft(draftId: string): Promise<any>;
  replayPolicyAuthoringDraft(draftId: string): Promise<any>;
  duplicatePolicyAuthoringDraft(draftId: string): Promise<any>;
  publishPolicyAuthoringDraft(draftId: string, input?: Record<string, unknown>): Promise<any>;
  listKillSwitches(): Promise<any>;
  saveKillSwitch(input: Record<string, unknown>): Promise<any>;
  listApprovalChains(): Promise<any>;
  saveApprovalChain(input: Record<string, unknown>): Promise<any>;
  listHardwareBindings(): Promise<any>;
  saveHardwareBinding(input: Record<string, unknown>): Promise<any>;
  getIntentTimeline(): Promise<any>;
  getWeeklyReview(): Promise<any>;
  getPolicyWorkbench(): Promise<any>;
  getWeeklyExpenseReport(): Promise<any>;
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
  approveIntent(approvalId: string, input?: Record<string, unknown>): Promise<any>;
  listApprovals(): Promise<any>;
  rejectIntent(approvalId: string, input?: Record<string, unknown>): Promise<any>;
  listLedger(agentId: string): Promise<any>;
  listReceipts(agentId: string): Promise<any>;
  attachReceiptEvidence(receiptId: string, input: Record<string, unknown>): Promise<any>;
  listApiKeys(): Promise<any>;
  createApiKey(input: string | { label: string; templateId?: string; scopes?: string[] }): Promise<any>;
  revokeApiKey(apiKeyId: string, input?: Record<string, unknown>): Promise<any>;
  rotateApiKey(apiKeyId: string, input?: Record<string, unknown>): Promise<any>;
}

export declare class Wallet {
  constructor(input: {
    client: AgentPayClient;
    workspace: Record<string, unknown>;
    agent: Record<string, unknown>;
    wallet?: Record<string, unknown> | null;
    apiKey?: Record<string, unknown> | null;
    policy?: Record<string, unknown> | null;
  });
  client: AgentPayClient;
  workspace: Record<string, unknown>;
  agent: Record<string, unknown>;
  wallet: Record<string, unknown> | null;
  apiKey: Record<string, unknown> | null;
  policy: Record<string, unknown> | null;
  static create(input: WalletCreateInput): Promise<Wallet>;
  static connect(input: { apiKey: string; baseUrl?: string; agentId?: string }): Promise<Wallet>;
  get agentId(): string;
  get workspaceId(): string;
  refresh(): Promise<any>;
  pay(input: WalletPayInput): Promise<any>;
  pendingApprovals(): Promise<any>;
  approveIfNeeded(payment: Record<string, unknown>, input?: { comment?: string }): Promise<any>;
  reject(approvalId: string, input?: { comment?: string }): Promise<any>;
  balance(): Promise<any>;
  settle(): Promise<any>;
  simulatePolicy(input: { templateId: string; rolloutMode?: string }): Promise<any>;
  listPolicyPacks(): Promise<any>;
  getPolicyPack(packId: string): Promise<any>;
  replayPolicyPack(packId: string, input?: { mode?: string }): Promise<any>;
  applyPolicyPack(packId: string, input?: { mode?: string }): Promise<any>;
  rollbackPolicyPack(packId: string): Promise<any>;
  listPolicyAuthoringDrafts(input?: { includeArchived?: boolean }): Promise<any>;
  getPolicyAuthoringDraft(draftId: string): Promise<any>;
  replayPolicyAuthoringDraft(draftId: string): Promise<any>;
  duplicatePolicyAuthoringDraft(draftId: string): Promise<any>;
  publishPolicyAuthoringDraft(draftId: string, input?: Record<string, unknown>): Promise<any>;
  listCounterpartyProfiles(): Promise<any>;
  getCounterpartyProfile(profileId: string): Promise<any>;
  compareCloseBundles(input: { left: string; right: string }): Promise<any>;
  auditReview(input?: { format?: "json" | "markdown" }): Promise<any>;
  financePacket(): Promise<any>;
  timeline(): Promise<any>;
  weeklyReview(): Promise<any>;
  check(input: {
    intent: string;
    cost: number;
    counterparty: string;
    budgetTags?: Record<string, string>;
    businessContext?: Record<string, unknown>;
  }): Promise<any>;
}
