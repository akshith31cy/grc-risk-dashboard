import db from '../config/database';

export const seedDatabase = () => {
  const risks = [
    { risk_id: 'RISK-001', risk_name: 'Cloud Storage Misconfiguration', category: 'Cloud Security', description: 'Misconfigured cloud storage buckets exposing sensitive data', impact_score: 4, probability_score: 4, owner: 'Cloud Security Team', nist_csf: 'PR.IP-1', iso27001_ref: 'A.8.9' },
    { risk_id: 'RISK-002', risk_name: 'Inadequate Password Complexity', category: 'Access Control', description: 'Weak password policies allowing easy credential compromise', impact_score: 3, probability_score: 5, owner: 'IAM Team', nist_csf: 'PR.AC-1', iso27001_ref: 'A.5.17' },
    { risk_id: 'RISK-003', risk_name: 'Malicious Insider Access', category: 'People & Culture', description: 'Employees with excessive privileges misusing access', impact_score: 5, probability_score: 3, owner: 'HR & Security', nist_csf: 'DE.CM-1', iso27001_ref: 'A.5.18' },
    { risk_id: 'RISK-004', risk_name: 'Unpatched Critical Vulnerabilities', category: 'Infrastructure', description: 'Systems running without security patches', impact_score: 5, probability_score: 4, owner: 'Infrastructure Team', nist_csf: 'PR.IP-12', iso27001_ref: 'A.8.8' },
    { risk_id: 'RISK-005', risk_name: 'Ransomware Infection', category: 'Infrastructure', description: 'Ransomware encrypting critical business systems', impact_score: 5, probability_score: 4, owner: 'Security Operations', nist_csf: 'PR.IP-4', iso27001_ref: 'A.8.13' },
    { risk_id: 'RISK-006', risk_name: 'Sensitive Data Exfiltration', category: 'Data Security', description: 'Unauthorized data transfer outside organization', impact_score: 5, probability_score: 3, owner: 'Data Protection Officer', nist_csf: 'PR.DS-5', iso27001_ref: 'A.8.24' },
    { risk_id: 'RISK-007', risk_name: 'Third-Party Vendor Breach', category: 'Supply Chain', description: 'Security incident at vendor compromising our data', impact_score: 4, probability_score: 4, owner: 'Vendor Management', nist_csf: 'ID.SC-2', iso27001_ref: 'A.5.19' },
    { risk_id: 'RISK-008', risk_name: 'Successful Spear Phishing Attack', category: 'People & Culture', description: 'Employees clicking malicious phishing emails', impact_score: 4, probability_score: 5, owner: 'Security Awareness Team', nist_csf: 'PR.AT-1', iso27001_ref: 'A.6.3' },
    { risk_id: 'RISK-009', risk_name: 'Insecure API Endpoints', category: 'Application Security', description: 'APIs lacking proper authentication and authorization', impact_score: 4, probability_score: 4, owner: 'Application Security', nist_csf: 'PR.AC-5', iso27001_ref: 'A.8.3' },
    { risk_id: 'RISK-010', risk_name: 'Excessive Privileged Access', category: 'Access Control', description: 'Too many users with administrative privileges', impact_score: 3, probability_score: 4, owner: 'IAM Team', nist_csf: 'PR.AC-4', iso27001_ref: 'A.5.18' },
    { risk_id: 'RISK-011', risk_name: 'Lost or Stolen Laptops', category: 'Infrastructure', description: 'Mobile devices lost containing unencrypted data', impact_score: 3, probability_score: 4, owner: 'Asset Management', nist_csf: 'PR.DS-1', iso27001_ref: 'A.7.9' },
    { risk_id: 'RISK-012', risk_name: 'Shadow IT Cloud Services', category: 'Cloud Security', description: 'Unapproved cloud applications used by employees', impact_score: 3, probability_score: 5, owner: 'Cloud Governance', nist_csf: 'ID.AM-5', iso27001_ref: 'A.5.20' },
    { risk_id: 'RISK-013', risk_name: 'Insufficient Security Logging', category: 'Infrastructure', description: 'Lack of audit logs preventing incident detection', impact_score: 4, probability_score: 3, owner: 'Security Operations', nist_csf: 'DE.AE-3', iso27001_ref: 'A.8.15' },
    { risk_id: 'RISK-014', risk_name: 'Distributed Denial of Service', category: 'Infrastructure', description: 'DDoS attacks disrupting business operations', impact_score: 4, probability_score: 3, owner: 'Network Security', nist_csf: 'PR.PT-5', iso27001_ref: 'A.8.6' },
    { risk_id: 'RISK-015', risk_name: 'SQL Injection Vulnerability', category: 'Application Security', description: 'Web applications vulnerable to SQL injection', impact_score: 4, probability_score: 3, owner: 'Application Security', nist_csf: 'PR.DS-2', iso27001_ref: 'A.8.3' },
    { risk_id: 'RISK-016', risk_name: 'Undefined Incident Response Process', category: 'Governance', description: 'No documented process for handling security incidents', impact_score: 5, probability_score: 2, owner: 'CISO Office', nist_csf: 'RS.CO-2', iso27001_ref: 'A.5.24' },
    { risk_id: 'RISK-017', risk_name: 'Privilege Escalation Attack', category: 'Access Control', description: 'Attackers gaining elevated system privileges', impact_score: 4, probability_score: 3, owner: 'Security Operations', nist_csf: 'PR.AC-4', iso27001_ref: 'A.8.2' },
    { risk_id: 'RISK-018', risk_name: 'Compromised Mobile Devices', category: 'Infrastructure', description: 'Mobile devices infected with malware', impact_score: 3, probability_score: 3, owner: 'Mobile Security', nist_csf: 'PR.DS-1', iso27001_ref: 'A.6.7' },
    { risk_id: 'RISK-019', risk_name: 'GDPR Non-Compliance Penalty', category: 'Governance', description: 'Regulatory fines for data protection violations', impact_score: 5, probability_score: 2, owner: 'Compliance Team', nist_csf: 'ID.GV-3', iso27001_ref: 'A.5.36' },
    { risk_id: 'RISK-020', risk_name: 'Business Email Compromise', category: 'People & Culture', description: 'Email accounts compromised for financial fraud', impact_score: 5, probability_score: 3, owner: 'Security Awareness Team', nist_csf: 'PR.AT-1', iso27001_ref: 'A.6.3' },
  ];

  const controls = [
    { control_id: 'CTRL-001', control_name: 'Automated Cloud Configuration Auditing', control_type: 'Detective', description: 'Continuous monitoring of cloud infrastructure against CIS benchmarks', implementation_status: 'Implemented', effectiveness_rating: 4, nist_csf: 'PR.IP-1', iso27001_ref: 'A.8.9' },
    { control_id: 'CTRL-002', control_name: 'Multi-Factor Authentication Enforcement', control_type: 'Preventive', description: 'MFA required for all user accounts', implementation_status: 'Implemented', effectiveness_rating: 5, nist_csf: 'PR.AC-1', iso27001_ref: 'A.5.17' },
    { control_id: 'CTRL-003', control_name: 'User Behavior Analytics', control_type: 'Detective', description: 'ML-based anomaly detection for insider threats', implementation_status: 'In Progress', effectiveness_rating: 4, nist_csf: 'DE.CM-1', iso27001_ref: 'A.5.18' },
    { control_id: 'CTRL-004', control_name: 'Automated Patch Management', control_type: 'Preventive', description: 'Automated deployment of security patches within 72 hours', implementation_status: 'Implemented', effectiveness_rating: 4, nist_csf: 'PR.IP-12', iso27001_ref: 'A.8.8' },
    { control_id: 'CTRL-005', control_name: 'Network Segmentation', control_type: 'Preventive', description: 'Isolated network zones to contain ransomware spread', implementation_status: 'Implemented', effectiveness_rating: 5, nist_csf: 'PR.IP-4', iso27001_ref: 'A.8.13' },
  ];

  // Clear existing data
  db.prepare('DELETE FROM framework_references').run();
  db.prepare('DELETE FROM risk_control_mapping').run();
  db.prepare('DELETE FROM risks').run();
  db.prepare('DELETE FROM controls').run();

  // Insert risks
  const insertRisk = db.prepare(`
    INSERT INTO risks (risk_id, risk_name, category, description, impact_score, probability_score, owner)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  risks.forEach(risk => {
    insertRisk.run(
      risk.risk_id,
      risk.risk_name,
      risk.category,
      risk.description,
      risk.impact_score,
      risk.probability_score,
      risk.owner
    );
  });

  // Insert framework references
  const insertFramework = db.prepare(`
    INSERT INTO framework_references (risk_id, framework_name, reference_code)
    VALUES (?, ?, ?)
  `);

  risks.forEach(risk => {
    insertFramework.run(risk.risk_id, 'NIST_CSF', risk.nist_csf);
    insertFramework.run(risk.risk_id, 'ISO27001', risk.iso27001_ref);
  });

  // Insert controls
  const insertControl = db.prepare(`
    INSERT INTO controls (control_id, control_name, control_type, description, implementation_status, effectiveness_rating, nist_csf, iso27001_ref)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  controls.forEach(control => {
    insertControl.run(
      control.control_id,
      control.control_name,
      control.control_type,
      control.description,
      control.implementation_status,
      control.effectiveness_rating,
      control.nist_csf,
      control.iso27001_ref
    );
  });

  console.log('✅ Database seeded with 20 risks and 5 controls');
};