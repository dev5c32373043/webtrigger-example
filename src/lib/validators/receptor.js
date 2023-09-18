import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import trim from 'lodash/trim';

export function validateRules(rules, errors) {
  if (isEmpty(rules)) return;

  const ruleValidator = rule => {
    const requiredFields = ['id', 'propType', 'key', 'value', 'op'];
    for (const field of requiredFields) {
      if (!has(rule, field)) {
        return true;
      }
    }

    const propTypes = ['string', 'number', 'boolean', 'date'];
    if (!propTypes.includes(rule.propType)) {
      return true;
    }

    const ops = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'co', 'nco', 'ex', 'nex'];
    if (!ops.includes(rule.op)) {
      return true;
    }

    return false;
  };

  const invalidRuleInPlace = rules.some(ruleValidator);

  if (invalidRuleInPlace) {
    errors.rule ||= [];
    errors.rule.push('Incorrect rule detected. Please recheck and try again');
  }
}

export default function validateReceptor(receptor, mode = 'default') {
  const errors = {};

  const requiredFields = mode === 'default' ? ['name', 'action', 'actionMethod', 'actionURL'] : [];
  for (const field of requiredFields) {
    if (isEmpty(receptor[field])) {
      errors[field] ||= [];
      errors[field].push(`Required property`);
    }
  }

  const action = trim(receptor.action);
  if (action && action < 2) {
    errors.action = ['Must be at least 2 characters'];
  }

  const actionMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  if (receptor.actionMethod && !actionMethods.includes(receptor.actionMethod)) {
    errors.actionMethod = ['Must be one of GET, POST, PUT, PATCH, DELETE'];
  }

  validateRules(receptor.rules, errors);

  return errors;
}
