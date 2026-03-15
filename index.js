export class AgentPayClient {
  constructor({ baseUrl = "http://127.0.0.1:3000", apiKey } = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey ?? null;
  }

  withApiKey(apiKey) {
    return new AgentPayClient({
      baseUrl: this.baseUrl,
      apiKey,
    });
  }

  async onboard(input) {
    return this.#request("/api/onboarding", {
      method: "POST",
      body: input,
      authenticated: false,
    });
  }

  async getBootstrap() {
    return this.#request("/api/bootstrap");
  }

  async createAgent(input) {
    return this.#request("/api/agents", {
      method: "POST",
      body: input,
    });
  }

  async createPolicy(agentId, input) {
    return this.#request(`/api/agents/${agentId}/policies`, {
      method: "POST",
      body: input,
    });
  }

  async listPolicyTemplates() {
    return this.#request("/api/policy-templates");
  }

  async listApiKeyTemplates() {
    return this.#request("/api/api-key-templates");
  }

  async listBudgetCaps() {
    return this.#request("/api/budget-caps");
  }

  async createBudgetCap(input) {
    return this.#request("/api/budget-caps", {
      method: "POST",
      body: input,
    });
  }

  async simulatePolicy(input) {
    return this.#request("/api/policies/simulate", {
      method: "POST",
      body: input,
    });
  }

  async diffPolicy(input) {
    return this.#request("/api/policies/diff", {
      method: "POST",
      body: input,
    });
  }

  async listAnomalies() {
    return this.#request("/api/anomalies");
  }

  async updateAnomaly(anomalyId, input) {
    return this.#request(`/api/anomalies/${anomalyId}`, {
      method: "POST",
      body: input,
    });
  }

  async createPaymentIntent(input) {
    return this.#request("/api/payments/intents", {
      method: "POST",
      body: input,
    });
  }

  async getIdentity() {
    return this.#request("/api/identity");
  }

  async updateIdentity(input) {
    return this.#request("/api/identity", {
      method: "POST",
      body: input,
    });
  }

  async getCompliance() {
    return this.#request("/api/compliance");
  }

  async getReputation() {
    return this.#request("/api/reputation");
  }

  async getPortableReputation() {
    return this.#request("/api/reputation/portable");
  }

  async getSignedPortableReputation() {
    return this.#request("/api/reputation/portable/signed");
  }

  async exportAgreementStandard() {
    return this.#request("/api/standards/agreements");
  }

  async exportSignedAgreementStandard() {
    return this.#request("/api/standards/agreements/signed");
  }

  async getAgreementStandardSchema() {
    return this.#request("/api/standards/agreement-schema");
  }

  async getEcosystemDirectory() {
    return this.#request("/api/ecosystem/directory");
  }

  async getSignedEcosystemDirectory() {
    return this.#request("/api/ecosystem/directory/signed");
  }

  async validateInteropEnvelope(input) {
    return this.#request("/api/interop/validate", {
      method: "POST",
      body: input,
    });
  }

  async listEvents() {
    return this.#request("/api/events");
  }

  async listWebhooks() {
    return this.#request("/api/webhooks");
  }

  async createWebhook(input) {
    return this.#request("/api/webhooks", {
      method: "POST",
      body: input,
    });
  }

  async listWebhookDeliveries() {
    return this.#request("/api/webhooks/deliveries");
  }

  async drainWebhooks() {
    return this.#request("/api/webhooks/drain", {
      method: "POST",
    });
  }

  async testWebhook(endpointId, input = { drainNow: true }) {
    return this.#request(`/api/webhooks/${endpointId}/test`, {
      method: "POST",
      body: input,
    });
  }

  async replayWebhook(endpointId, input) {
    return this.#request(`/api/webhooks/${endpointId}/replay`, {
      method: "POST",
      body: input,
    });
  }

  async exportAudit() {
    return this.#request("/api/audit/export");
  }

  async getCostReport({ format = "json" } = {}) {
    return this.#request(`/api/reporting/costs?format=${encodeURIComponent(format)}`, {
      parseAs: format === "json" ? "json" : "text",
    });
  }

  async exportCostReport(format = "csv") {
    return this.#request(`/api/reporting/costs?format=${encodeURIComponent(format)}`, {
      parseAs: format === "json" ? "json" : "text",
    });
  }

  async getMonthlyStatement(month) {
    const query = month ? `?month=${encodeURIComponent(month)}` : "";
    return this.#request(`/api/statements/monthly${query}`);
  }

  async listAgreements() {
    return this.#request("/api/agreements");
  }

  async createAgreement(input) {
    return this.#request("/api/agreements", {
      method: "POST",
      body: input,
    });
  }

  async submitMilestoneProof(agreementId, milestoneId, input) {
    return this.#request(`/api/agreements/${agreementId}/milestones/${milestoneId}/proof`, {
      method: "POST",
      body: input,
    });
  }

  async releaseMilestone(agreementId, milestoneId) {
    return this.#request(`/api/agreements/${agreementId}/milestones/${milestoneId}/release`, {
      method: "POST",
    });
  }

  async disputeMilestone(agreementId, milestoneId, input) {
    return this.#request(`/api/agreements/${agreementId}/milestones/${milestoneId}/dispute`, {
      method: "POST",
      body: input,
    });
  }

  async resolveMilestone(agreementId, milestoneId, input) {
    return this.#request(`/api/agreements/${agreementId}/milestones/${milestoneId}/resolve`, {
      method: "POST",
      body: input,
    });
  }

  async getWallet() {
    return this.#request("/api/wallet");
  }

  async createDeposit(input) {
    return this.#request("/api/wallet/deposits", {
      method: "POST",
      body: input,
    });
  }

  async createPayout(input) {
    return this.#request("/api/wallet/payouts", {
      method: "POST",
      body: input,
    });
  }

  async listSettlementJobs() {
    return this.#request("/api/settlement/jobs");
  }

  async runSettlement() {
    return this.#request("/api/settlement/run", {
      method: "POST",
    });
  }

  async getReconciliation() {
    return this.#request("/api/reconciliation");
  }

  async approveIntent(approvalId, input = {}) {
    return this.#request(`/api/approvals/${approvalId}/approve`, {
      method: "POST",
      body: input,
    });
  }

  async rejectIntent(approvalId, input = {}) {
    return this.#request(`/api/approvals/${approvalId}/reject`, {
      method: "POST",
      body: input,
    });
  }

  async listLedger(agentId) {
    return this.#request(`/api/agents/${agentId}/ledger`);
  }

  async listReceipts(agentId) {
    return this.#request(`/api/agents/${agentId}/receipts`);
  }

  async attachReceiptEvidence(receiptId, input) {
    return this.#request(`/api/receipts/${receiptId}/evidence`, {
      method: "POST",
      body: input,
    });
  }

  async createApiKey(input) {
    const body = typeof input === "string" ? { label: input } : input;
    return this.#request("/api/api-keys", {
      method: "POST",
      body,
    });
  }

  async listApiKeys() {
    return this.#request("/api/api-keys");
  }

  async revokeApiKey(apiKeyId, input = {}) {
    return this.#request(`/api/api-keys/${apiKeyId}/revoke`, {
      method: "POST",
      body: input,
    });
  }

  async rotateApiKey(apiKeyId, input = {}) {
    return this.#request(`/api/api-keys/${apiKeyId}/rotate`, {
      method: "POST",
      body: input,
    });
  }

  async #request(pathname, { method = "GET", body, authenticated = true, parseAs = "json" } = {}) {
    const headers = {};

    if (body !== undefined) {
      headers["content-type"] = "application/json";
    }

    if (authenticated) {
      if (!this.apiKey) {
        throw new Error("Missing apiKey for authenticated request");
      }
      headers["x-api-key"] = this.apiKey;
    }

    const response = await fetch(`${this.baseUrl}${pathname}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const data = parseAs === "json" ? (text ? JSON.parse(text) : null) : text;

    if (!response.ok) {
      const message = parseAs === "json" ? data?.message ?? `Request failed with status ${response.status}` : `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    return data;
  }
}

function looksLikeEvmAddress(value) {
  return typeof value === "string" && value.startsWith("0x") && value.length === 42;
}

function firstAgent(bootstrap) {
  if (!bootstrap?.agents?.length) {
    throw new Error("Wallet bootstrap did not return any agents");
  }
  return bootstrap.agents[0];
}

function findPendingApproval(bootstrap, paymentIntentId) {
  return bootstrap?.approvals?.find((item) => item.paymentIntentId === paymentIntentId) ?? null;
}

export class Wallet {
  constructor({ client, workspace, agent, wallet, apiKey, policy = null }) {
    this.client = client;
    this.workspace = workspace;
    this.agent = agent;
    this.wallet = wallet ?? null;
    this.apiKey = apiKey ?? null;
    this.policy = policy;
  }

  static async create({
    owner,
    dailyLimit = 100,
    baseUrl = "http://127.0.0.1:3000",
    workspaceName,
    requireApprovalAbove,
    maxTransaction,
    whitelist,
    autoPauseOnAnomaly = false,
    reviewOnAnomaly = false,
    startingBalance = 100,
  }) {
    const publicClient = new AgentPayClient({ baseUrl });
    const onboarding = await publicClient.onboard({
      workspaceName: workspaceName ?? `${owner} workspace`,
      agentName: owner,
      dailyLimitUsd: dailyLimit,
      requireApprovalOverUsd: requireApprovalAbove,
      maxTransactionUsd: maxTransaction,
      counterpartyAllowlist: whitelist,
      autoPauseOnAnomaly,
      reviewOnAnomaly,
      startingBalanceUsd: startingBalance,
    });
    return new Wallet({
      client: publicClient.withApiKey(onboarding.apiKey.key),
      workspace: onboarding.workspace,
      agent: onboarding.agent,
      wallet: onboarding.wallet,
      apiKey: onboarding.apiKey,
      policy: onboarding.policy ?? null,
    });
  }

  static async connect({ apiKey, baseUrl = "http://127.0.0.1:3000", agentId }) {
    const client = new AgentPayClient({ baseUrl, apiKey });
    const bootstrap = await client.getBootstrap();
    const agent = agentId
      ? bootstrap.agents.find((item) => item.id === agentId) ?? firstAgent(bootstrap)
      : firstAgent(bootstrap);
    return new Wallet({
      client,
      workspace: bootstrap.workspace,
      agent,
      wallet: bootstrap.wallet ?? null,
      apiKey: { key: apiKey },
    });
  }

  get agentId() {
    return this.agent.id;
  }

  get workspaceId() {
    return this.workspace.id;
  }

  async refresh() {
    const bootstrap = await this.client.getBootstrap();
    this.workspace = bootstrap.workspace;
    this.agent = bootstrap.agents.find((item) => item.id === this.agentId) ?? firstAgent(bootstrap);
    this.wallet = bootstrap.wallet ?? null;
    return bootstrap;
  }

  async pay({ amount, to, purpose, counterparty, budgetTags }) {
    const destination = looksLikeEvmAddress(to) ? to : null;
    const resolvedCounterparty = counterparty ?? (destination ? "external" : to);
    const result = await this.client.createPaymentIntent({
      agentId: this.agentId,
      amountUsd: amount,
      counterparty: resolvedCounterparty,
      destination,
      budgetTags,
      purpose: purpose ?? `agent payment to ${resolvedCounterparty}`,
    });
    const paymentIntent = result.paymentIntent ?? {};
    if (paymentIntent.status === "queued") {
      const bootstrap = await this.client.getBootstrap();
      const approval = findPendingApproval(bootstrap, paymentIntent.id);
      if (approval) {
        result.approval = approval;
      }
      result.requiresApproval = Boolean(approval);
    } else {
      result.requiresApproval = false;
    }
    return result;
  }

  async approveIfNeeded(payment, { comment } = {}) {
    if (payment?.approval?.id) {
      return this.client.approveIntent(payment.approval.id, comment ? { comment } : undefined);
    }
    const paymentIntent = payment?.paymentIntent ?? {};
    if (paymentIntent.status !== "queued") {
      return payment;
    }
    const bootstrap = await this.client.getBootstrap();
    const approval = findPendingApproval(bootstrap, paymentIntent.id);
    if (!approval) {
      throw new Error("No pending approval found for payment intent");
    }
    return this.client.approveIntent(approval.id, comment ? { comment } : undefined);
  }

  async balance() {
    const walletState = await this.client.getWallet();
    this.wallet = walletState;
    return walletState;
  }

  async settle() {
    return this.client.runSettlement();
  }
}
