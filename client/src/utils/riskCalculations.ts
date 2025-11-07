export const calculateRiskScore = (impact: number, probability: number): number => {
  return impact * probability;
};

export const getRiskSeverity = (score: number): {
  label: string;
  color: string;
  bgColor: string;
} => {
  if (score >= 16) {
    return { label: 'Critical', color: 'text-red-700', bgColor: 'bg-red-100' };
  } else if (score >= 12) {
    return { label: 'High', color: 'text-orange-700', bgColor: 'bg-orange-100' };
  } else if (score >= 6) {
    return { label: 'Medium', color: 'text-yellow-700', bgColor: 'bg-yellow-100' };
  } else {
    return { label: 'Low', color: 'text-green-700', bgColor: 'bg-green-100' };
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Open':
      return 'bg-red-100 text-red-800';
    case 'Mitigated':
      return 'bg-green-100 text-green-800';
    case 'Accepted':
      return 'bg-blue-100 text-blue-800';
    case 'Transferred':
      return 'bg-purple-100 text-purple-800';
    case 'Closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'Infrastructure': 'bg-blue-100 text-blue-800',
    'Access Control': 'bg-purple-100 text-purple-800',
    'Cloud Security': 'bg-cyan-100 text-cyan-800',
    'Application Security': 'bg-green-100 text-green-800',
    'Data Security': 'bg-yellow-100 text-yellow-800',
    'People & Culture': 'bg-pink-100 text-pink-800',
    'Supply Chain': 'bg-orange-100 text-orange-800',
    'Governance': 'bg-indigo-100 text-indigo-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
