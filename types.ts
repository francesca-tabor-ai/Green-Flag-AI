
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum ReadinessStatus {
  READY = 'CERTIFIED',
  IN_PROGRESS = 'IN_AUDIT',
  BLOCKED = 'RESTRICTED',
  PENDING = 'PENDING_VALIDATION'
}

export interface Blocker {
  id: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'OPEN' | 'RESOLVED';
  actionLink?: string;
}

export interface ApprovalStep {
  id: string;
  role: string;
  name: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp?: string;
  comment?: string;
  avatar: string;
}

export interface RiskIssue {
  id: string;
  category: 'Safety' | 'Security' | 'Quality' | 'Compliance';
  title: string;
  description: string;
  severity: RiskLevel;
  sourceType: 'LOG' | 'TEST_CASE' | 'POLICY';
  sourceId: string;
  timestamp: string;
}

export interface ScoreFeedback {
  id: string;
  scoreId: string;
  userId: string;
  comment: string;
  discrepancyType: 'OVERESTIMATED' | 'UNDERESTIMATED' | 'INCORRECT_MAPPING';
  timestamp: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput?: string;
  actualOutput: string;
  status: 'PASS' | 'FAIL' | 'FLAGGED';
  score: number;
  category: 'Hallucination' | 'Safety' | 'Alignment' | 'Accuracy';
  judgeRationale?: string;
  latency?: number;
  timestamp: string;
}

export interface EvalRun {
  id: string;
  name: string;
  modelId: string;
  modelVersion: string;
  timestamp: string;
  status: 'COMPLETED' | 'FAILED' | 'RUNNING' | 'SCHEDULED';
  passRate: number;
  totalTests: number;
  severity: RiskLevel;
  frequency?: 'ADHOC' | 'DAILY' | 'WEEKLY';
}

export interface EvaluationSummary {
  id: string;
  modelId: string;
  timestamp: string;
  status: 'COMPLETED' | 'FAILED' | 'RUNNING';
  metrics: {
    hallucinationRate: number;
    safetyScore: number;
    regressionDelta: number;
    accuracy: number;
  };
  history: number[]; // For sparklines
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface TraceSpan {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  service: string;
  status: 'ok' | 'error';
  children?: TraceSpan[];
}

export interface Trace {
  id: string;
  rootService: string;
  startTime: string;
  totalDuration: number;
  spans: TraceSpan[];
}

export interface AlertMonitor {
  id: string;
  name: string;
  type: 'METRIC' | 'LOG_PATTERN';
  target: string;
  threshold?: number;
  operator?: '>' | '<' | '==';
  channels: string[];
  status: 'ACTIVE' | 'PAUSED';
  lastTriggered?: string;
}

export interface AIModel {
  id: string;
  name: string;
  currentVersion: string;
  riskScore: number;
  status: ReadinessStatus;
  category: string;
  lastAssessed: string;
  description: string;
  owner: {
    name: string;
    email: string;
    avatar: string;
  };
  versions: ModelVersion[];
  prompts: PromptVersion[];
  deployments: DeploymentEvent[];
}

export interface ModelVersion {
  id: string;
  version: string;
  createdAt: string;
  author: string;
  status: ReadinessStatus;
  metadata: Record<string, string>;
  metrics?: {
    latency: string;
    throughput: string;
    accuracy_delta: string;
  };
}

export interface PromptVersion {
  id: string;
  version: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface DeploymentEvent {
  id: string;
  environment: 'Development' | 'Staging' | 'Production';
  status: 'Operational' | 'Degraded' | 'Offline';
  date: string;
  version: string;
}

export interface AssuranceMetric {
  name: string;
  value: number | string;
  change: number;
  status: 'positive' | 'negative' | 'neutral';
  technicalLabel?: string;
}

export interface GeminiAnalysisResult {
  score: number;
  risks: string[];
  recommendations: string[];
  complianceGap: string[];
  goLiveDecision: string;
}
