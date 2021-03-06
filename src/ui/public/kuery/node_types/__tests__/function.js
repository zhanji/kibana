import * as functionType from '../function';
import _ from 'lodash';
import expect from 'expect.js';
import { expectDeepEqual } from '../../../../../test_utils/expect_deep_equal.js';
import * as isFunction from '../../functions/is';
import indexPatternResponse from '../../__tests__/index_pattern_response.json';

import { nodeTypes } from '../../node_types';

describe('kuery node types', function () {

  describe('function', function () {

    let indexPattern;


    beforeEach(() => {
      indexPattern = indexPatternResponse;
    });

    describe('buildNode', function () {

      it('should return a node representing the given kuery function', function () {
        const result = functionType.buildNode('is', 'extension', 'jpg');
        expect(result).to.have.property('type', 'function');
        expect(result).to.have.property('function', 'is');
        expect(result).to.have.property('arguments');
      });

    });

    describe('buildNodeWithArgumentNodes', function () {

      it('should return a function node with the given argument list untouched', function () {
        const fieldNameLiteral = nodeTypes.literal.buildNode('extension');
        const valueLiteral = nodeTypes.literal.buildNode('jpg');
        const argumentNodes = [fieldNameLiteral, valueLiteral];
        const result = functionType.buildNodeWithArgumentNodes('is', argumentNodes);

        expect(result).to.have.property('type', 'function');
        expect(result).to.have.property('function', 'is');
        expect(result).to.have.property('arguments');
        expect(result.arguments).to.be(argumentNodes);
        expectDeepEqual(result.arguments, argumentNodes);
      });

    });

    describe('toElasticsearchQuery', function () {

      it('should return the given function type\'s ES query representation', function () {
        const node = functionType.buildNode('is', 'extension', 'jpg');
        const expected = isFunction.toElasticsearchQuery(node, indexPattern);
        const result = functionType.toElasticsearchQuery(node, indexPattern);
        expect(_.isEqual(expected, result)).to.be(true);
      });

    });


  });

});
