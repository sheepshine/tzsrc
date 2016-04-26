/***----------------------------------XSS过滤添加实现-----------------------------------**/
(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;
				if (!u && a)
					return a(o, !0);
				if (i)
					return i(o, !0);
				throw new Error("Cannot find module '" + o + "'")
			}
			var f = n[o] = {
				exports : {}
			};
			t[o][0].call(f.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, f, f.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof require == "function" && require;
	for ( var o = 0; o < r.length; o++)
		s(r[o]);
	return s
})
		(
				{
					1 : [ function(require, module, exports) {
						/**
						 * 默认配置
						 *
						 * @author 老雷<leizongmin@gmail.com>
						 */

						// 默认白名单
							var whiteList = {
								a : [ 'target', 'href', 'title' ],
								abbr : [ 'title' ],
								address : [],
								area : [ 'shape', 'coords', 'href', 'alt' ],
								article : [],
								aside : [],
								audio : [ 'autoplay', 'controls', 'loop',
										'preload', 'src' ],
								b : [],
								bdi : [ 'dir' ],
								bdo : [ 'dir' ],
								big : [],
								blockquote : [ 'cite' ],
								br : [],
								caption : [],
								center : [],
								cite : [],
								code : [],
								col : [ 'align', 'valign', 'span', 'width' ],
								colgroup : [ 'align', 'valign', 'span', 'width' ],
								dd : [],
								del : [ 'datetime' ],
								details : [ 'open' ],
								div : [],
								dl : [],
								dt : [],
								em : [],
								font : [ 'color', 'size', 'face' ],
								footer : [],
								h1 : [],
								h2 : [],
								h3 : [],
								h4 : [],
								h5 : [],
								h6 : [],
								header : [],
								hr : [],
								i : [],
								img : [ 'src', 'alt', 'title', 'width',
										'height' ],
								ins : [ 'datetime' ],
								li : [],
								mark : [],
								nav : [],
								ol : [],
								p : [],
								pre : [],
								s : [],
								section : [],
								small : [],
								span : [],
								strong : [],
								table : [ 'width', 'border', 'align', 'valign' ],
								tbody : [ 'align', 'valign' ],
								td : [ 'width', 'colspan', 'align', 'valign' ],
								tfoot : [ 'align', 'valign' ],
								th : [ 'width', 'colspan', 'align', 'valign' ],
								thead : [ 'align', 'valign' ],
								tr : [ 'rowspan', 'align', 'valign' ],
								tt : [],
								u : [],
								ul : [],
								video : [ 'autoplay', 'controls', 'loop',
										'preload', 'src', 'height', 'width' ]
							};

							/**
							 * 匹配到标签时的处理方法
							 *
							 * @param {String} tag
							 * @param {String} html
							 * @param {Object} options
							 * @return {String}
							 */
							function onTag(tag, html, options) {
								// do nothing
							}

							/**
							 * 匹配到不在白名单上的标签时的处理方法
							 *
							 * @param {String} tag
							 * @param {String} html
							 * @param {Object} options
							 * @return {String}
							 */
							function onIgnoreTag(tag, html, options) {
								// do nothing
							}

							/**
							 * 匹配到标签属性时的处理方法
							 *
							 * @param {String} tag
							 * @param {String} name
							 * @param {String} value
							 * @return {String}
							 */
							function onTagAttr(tag, name, value) {
								// do nothing
							}

							/**
							 * 匹配到不在白名单上的标签属性时的处理方法
							 *
							 * @param {String} tag
							 * @param {String} name
							 * @param {String} value
							 * @return {String}
							 */
							function onIgnoreTagAttr(tag, name, value) {
								// do nothing
							}

							/**
							 * HTML转义
							 *
							 * @param {String} html
							 */
							function escapeHtml(html) {
								return html.replace(REGEXP_LT, '&lt;').replace(
										REGEXP_GT, '&gt;');
							}

							/**
							 * 安全的标签属性值
							 *
							 * @param {String} tag
							 * @param {String} name
							 * @param {String} value
							 * @return {String}
							 */
							function safeAttrValue(tag, name, value) {
								// 转换为友好的属性值，再做判断
								value = friendlyAttrValue(value);

								if (name === 'href' || name === 'src') {
									// 过滤 href 和 src 属性
									// 仅允许 http:// | https:// | / 开头的地址
									value = value.trim();
									if (value === '#')
										return '#';
									if (value
											&& !REGEXP_DEFAULT_ON_TAG_ATTR_1
													.test(value)) {
										return '';
									}
								} else if (name === 'background') {
									// 过滤 background 属性 （这个xss漏洞较老了，可能已经不适用）
									// javascript:
									REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
									if (REGEXP_DEFAULT_ON_TAG_ATTR_4
											.test(value)) {
										return '';
									}
								} else if (name === 'style') {
									// /*注释*/
									REGEXP_DEFAULT_ON_TAG_ATTR_3.lastIndex = 0;
									if (REGEXP_DEFAULT_ON_TAG_ATTR_3
											.test(value)) {
										return '';
									}
									// expression()
									REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
									if (REGEXP_DEFAULT_ON_TAG_ATTR_7
											.test(value)) {
										return '';
									}
									// url()
									REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
									if (REGEXP_DEFAULT_ON_TAG_ATTR_8
											.test(value)) {
										REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
										if (REGEXP_DEFAULT_ON_TAG_ATTR_4
												.test(value)) {
											return '';
										}
									}
								}

								// 输出时需要转义<>"
								value = escapeAttrValue(value);
								return value;
							}

							// 正则表达式
							var REGEXP_LT = /</g;
							var REGEXP_GT = />/g;
							var REGEXP_QUOTE = /"/g;
							var REGEXP_QUOTE_2 = /&quot;/g;
							var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/img;
							var REGEXP_ATTR_VALUE_COLON = /&colon;?/img;
							var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/img;
							var REGEXP_DEFAULT_ON_TAG_ATTR_1 = /^((https?:\/)?\/)/;
							var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//mg;
							var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/ig;
							var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/ig;
							var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//ig;
							var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/ig;
							var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/ig;

							/**
							 * 对双引号进行转义
							 *
							 * @param {String} str
							 * @return {String} str
							 */
							function escapeQuote(str) {
								return str.replace(REGEXP_QUOTE, '&quote;');
							}

							/**
							 * 对双引号进行转义
							 *
							 * @param {String} str
							 * @return {String} str
							 */
							function unescapeQuote(str) {
								return str.replace(REGEXP_QUOTE_2, '"');
							}

							/**
							 * 对html实体编码进行转义
							 *
							 * @param {String} str
							 * @return {String}
							 */
							function escapeHtmlEntities(str) {
								return str
										.replace(
												REGEXP_ATTR_VALUE_1,
												function replaceUnicode(str,
														code) {
													return (code[0] === 'x' || code[0] === 'X') ? String
															.fromCharCode(parseInt(
																	code
																			.substr(1),
																	16))
															: String
																	.fromCharCode(parseInt(
																			code,
																			10));
												});
							}

							/**
							 * 对html5新增的危险实体编码进行转义
							 *
							 * @param {String} str
							 * @return {String}
							 */
							function escapeDangerHtml5Entities(str) {
								return str
										.replace(REGEXP_ATTR_VALUE_COLON, ':')
										.replace(REGEXP_ATTR_VALUE_NEWLINE, ' ');
							}

							/**
							 * 清除不可见字符
							 *
							 * @param {String} str
							 * @return {String}
							 */
							function clearNonPrintableCharacter(str) {
								var str2 = '';
								for ( var i = 0, len = str.length; i < len; i++) {
									str2 += str.charCodeAt(i) < 32 ? ' ' : str
											.charAt(i);
								}
								return str2.trim();
							}

							/**
							 * 将标签的属性值转换成一般字符，便于分析
							 *
							 * @param {String} str
							 * @return {String}
							 */
							function friendlyAttrValue(str) {
								str = unescapeQuote(str); // 双引号
								str = escapeHtmlEntities(str); // 转换HTML实体编码
								str = escapeDangerHtml5Entities(str); // 转换危险的HTML5新增实体编码
								str = clearNonPrintableCharacter(str); // 清除不可见字符
								return str;
							}

							/**
							 * 转义用于输出的标签属性值
							 *
							 * @param {String} str
							 * @return {String}
							 */
							function escapeAttrValue(str) {
								str = escapeQuote(str);
								str = escapeHtml(str);
								return str;
							}

							/**
							 * 去掉不在白名单中的标签onIgnoreTag处理方法
							 */
							function onIgnoreTagStripAll() {
								return '';
							}

							/**
							 * 删除标签体
							 *
							 * @param {array} tags 要删除的标签列表
							 * @param {function} next 对不在列表中的标签的处理函数，可选
							 */
							function StripTagBody(tags, next) {
								if (typeof (next) !== 'function') {
									next = function() {
									};
								}

								var isRemoveAllTag = !Array.isArray(tags);
								function isRemoveTag(tag) {
									if (isRemoveAllTag)
										return true;
									return (tags.indexOf(tag) !== -1);
								}

								var removeList = []; // 要删除的位置范围列表
								var posStart = false; // 当前标签开始位置

								return {
									onIgnoreTag : function(tag, html, options) {
										if (isRemoveTag(tag)) {
											if (options.isClosing) {
												var ret = '[/removed]';
												var end = options.position
														+ ret.length;
												removeList
														.push( [
																posStart !== false ? posStart
																		: options.position,
																end ]);
												posStart = false;
												return ret;
											} else {
												if (!posStart) {
													posStart = options.position;
												}
												return '[removed]';
											}
										} else {
											return next(tag, html, options);
										}
									},
									remove : function(html) {
										var rethtml = '';
										var lastPos = 0;
										removeList.forEach(function(pos) {
											rethtml += html.slice(lastPos,
													pos[0]);
											lastPos = pos[1];
										});
										rethtml += html.slice(lastPos);
										return rethtml;
									}
								};
							}

							/**
							 * 去除备注标签
							 *
							 * @param {String} html
							 * @return {String}
							 */
							function stripCommentTag(html) {
								return html.replace(STRIP_COMMENT_TAG_REGEXP,
										'');
							}
							var STRIP_COMMENT_TAG_REGEXP = /<!--(.|\s)*?-->/gm;

							exports.whiteList = whiteList;
							exports.onTag = onTag;
							exports.onIgnoreTag = onIgnoreTag;
							exports.onTagAttr = onTagAttr;
							exports.onIgnoreTagAttr = onIgnoreTagAttr;
							exports.safeAttrValue = safeAttrValue;
							exports.escapeHtml = escapeHtml;
							exports.escapeQuote = escapeQuote;
							exports.unescapeQuote = unescapeQuote;
							exports.escapeHtmlEntities = escapeHtmlEntities;
							exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
							exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
							exports.friendlyAttrValue = friendlyAttrValue;
							exports.escapeAttrValue = escapeAttrValue;
							exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
							exports.StripTagBody = StripTagBody;
							exports.stripCommentTag = stripCommentTag;

						}, {} ],
					2 : [ function(require, module, exports) {
						/**
						 * 模块入口
						 *
						 * @author 老雷<leizongmin@gmail.com>
						 */

						var DEFAULT = require('./default');
						var parser = require('./parser');
						var FilterXSS = require('./xss');

						/**
						 * XSS过滤
						 *
						 * @param {String} html 要过滤的HTML代码
						 * @param {Object} options 选项：whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml
						 * @return {String}
						 */
						function filterXSS(html, options) {
							var xss = new FilterXSS(options);
							return xss.process(html);
						}

						// 输出
							exports = module.exports = filterXSS;
							exports.FilterXSS = FilterXSS;
							for ( var i in DEFAULT)
								exports[i] = DEFAULT[i];
							for ( var i in parser)
								exports[i] = parser[i];

							// 在浏览器端使用
							if (typeof window !== 'undefined') {
								// 低版本浏览器支持
								if (!Array.prototype.indexOf) {
									Array.prototype.indexOf = function(item) {
										for ( var i = 0; i < this.length; i++) {
											if (this[i] == item)
												return i;
										}
										return -1;
									};
								}
								if (!Array.prototype.forEach) {
									Array.prototype.forEach = function(fn,
											scope) {
										for ( var i = 0; i < this.length; i++)
											fn.call(scope, this[i], i, this);
									};
								}
								if (!String.prototype.trim) {
									String.prototype.trim = function() {
										return this.replace(/(^\s*)|(\s*$)/g,
												'');
									};
								}
								// 输出
								window.filterXSS = module.exports;
							}

						}, {
							"./default" : 1,
							"./parser" : 3,
							"./xss" : 4
						} ],
					3 : [ function(require, module, exports) {
						/**
						 * 简单 HTML Parser
						 *
						 * @author 老雷<leizongmin@gmail.com>
						 */

						/**
						 * 获取标签的名称
						 *
						 * @param {String} html 如：'<a hef="#">'
						 * @return {String}
						 */
						function getTagName(html) {
							var i = html.indexOf(' ');
							if (i === -1) {
								var tagName = html.slice(1, -1);
							} else {
								var tagName = html.slice(1, i + 1);
							}
							tagName = tagName.trim().toLowerCase();
							if (tagName[0] === '/')
								tagName = tagName.slice(1);
							if (tagName[tagName.length - 1] === '/')
								tagName = tagName.slice(0, -1);
							return tagName;
						}

						/**
						 * 是否为闭合标签
						 *
						 * @param {String} html 如：'<a hef="#">'
						 * @return {Boolean}
						 */
						function isClosing(html) {
							return (html.slice(0, 2) === '</');
						}

						/**
						 * 分析HTML代码，调用相应的函数处理，返回处理后的HTML
						 *
						 * @param {String} html
						 * @param {Function} onTag 处理标签的函数
						 *   参数格式： function (sourcePosition, position, tag, html, isClosing)
						 * @param {Function} escapeHtml 对HTML进行转义的韩松
						 * @return {String}
						 */
						function parseTag(html, onTag, escapeHtml) {
							'user strict';

							var rethtml = ''; // 待返回的HTML
							var lastPos = 0; // 上一个标签结束位置
							var tagStart = false; // 当前标签开始位置
							var quoteStart = false; // 引号开始位置
							var currentPos = 0; // 当前位置
							var len = html.length; // HTML长度
							var currentHtml = ''; // 当前标签的HTML代码
							var currentTagName = ''; // 当前标签的名称

							// 逐个分析字符
							for (currentPos = 0; currentPos < len; currentPos++) {
								var c = html.charAt(currentPos);
								if (tagStart === false) {
									if (c === '<') {
										tagStart = currentPos;
										continue;
									}
								} else {
									if (quoteStart === false) {
										if (c === '<') {
											rethtml += escapeHtml(html.slice(
													lastPos, currentPos));
											tagStart = currentPos;
											lastPos = currentPos;
											continue;
										}
										if (c === '>') {
											rethtml += escapeHtml(html.slice(
													lastPos, tagStart));
											currentHtml = html.slice(tagStart,
													currentPos + 1);
											currentTagName = getTagName(currentHtml);
											rethtml += onTag(tagStart,
													rethtml.length,
													currentTagName,
													currentHtml,
													isClosing(currentHtml));
											lastPos = currentPos + 1;
											tagStart = false;
											continue;
										}
										if (c === '"' || c === "'") {
											quoteStart = c;
											continue;
										}
									} else {
										if (c === quoteStart) {
											quoteStart = false;
											continue;
										}
									}
								}
							}
							if (lastPos < html.length) {
								rethtml += escapeHtml(html.substr(lastPos));
							}

							return rethtml;
						}

						// 不符合属性名称规则的正则表达式
						var REGEXP_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/img;

						/**
						 * 分析标签HTML代码，调用相应的函数处理，返回HTML
						 *
						 * @param {String} html 如标签'<a href="#" target="_blank">' 则为 'href="#" target="_blank"'
						 * @param {Function} onAttr 处理属性值的函数
						 *   函数格式： function (name, value)
						 * @return {String}
						 */
						function parseAttr(html, onAttr) {
							'user strict';

							var lastPos = 0; // 当前位置
							var retAttrs = []; // 待返回的属性列表
							var tmpName = false; // 临时属性名称
							var len = html.length; // HTML代码长度

							function addAttr(name, value) {
								name = name.trim();
								name = name.replace(REGEXP_ATTR_NAME, '')
										.toLowerCase();
								if (name.length < 1)
									return;
								retAttrs.push(onAttr(name, value || ''));
							}
							;

							// 逐个分析字符
							for ( var i = 0; i < len; i++) {
								var c = html.charAt(i), v;
								if (tmpName === false && c === '=') {
									tmpName = html.slice(lastPos, i);
									lastPos = i + 1;
									continue;
								}
								if (tmpName !== false) {
									if (i === lastPos
											&& (c === '"' || c === "'")) {
										var j = html.indexOf(c, i + 1);
										if (j === -1) {
											break;
										} else {
											v = html.slice(lastPos + 1, j)
													.trim();
											addAttr(tmpName, v);
											tmpName = false;
											i = j;
											lastPos = i + 1;
											continue;
										}
									}
								}
								if (c === ' ') {
									v = html.slice(lastPos, i).trim();
									if (tmpName === false) {
										addAttr(v);
									} else {
										addAttr(tmpName, v);
									}
									tmpName = false;
									lastPos = i + 1;
									continue;
								}
							}

							if (lastPos < html.length) {
								if (tmpName === false) {
									addAttr(html.slice(lastPos));
								} else {
									addAttr(tmpName, html.slice(lastPos));
								}
							}

							return retAttrs.join(' ').trim();
						}

						exports.parseTag = parseTag;
						exports.parseAttr = parseAttr;

					}, {} ],
					4 : [
							function(require, module, exports) {
								/**
								 * 过滤XSS
								 *
								 * @author 老雷<leizongmin@gmail.com>
								 */

								var DEFAULT = require('./default');
								var parser = require('./parser');
								var parseTag = parser.parseTag;
								var parseAttr = parser.parseAttr;

								/**
								 * 返回值是否为空
								 *
								 * @param {Object} obj
								 * @return {Boolean}
								 */
								function isNull(obj) {
									return (obj === undefined || obj === null);
								}

								/**
								 * 取标签内的属性列表字符串
								 *
								 * @param {String} html
								 * @return {Object}
								 *   - {String} html
								 *   - {Boolean} closing
								 */
								function getAttrs(html) {
									var i = html.indexOf(' ');
									if (i === -1) {
										return {
											html : '',
											closing : (html[html.length - 2] === '/')
										};
									}
									html = html.slice(i + 1, -1).trim();
									var isClosing = (html[html.length - 1] === '/');
									if (isClosing)
										html = html.slice(0, -1).trim();
									return {
										html : html,
										closing : isClosing
									};
								}

								/**
								 * XSS过滤对象
								 *
								 * @param {Object} options 选项：whiteList, onTag, onTagAttr, onIgnoreTag,
								 *                               onIgnoreTagAttr, safeAttrValue, escapeHtml
								 *                               stripIgnoreTagBody, allowCommentTag
								 */
								function FilterXSS(options) {
									options = options || {};

									if (options.stripIgnoreTag) {
										if (options.onIgnoreTag) {
											console
													.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time');
										}
										options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
									}

									options.whiteList = options.whiteList
											|| DEFAULT.whiteList;
									options.onTag = options.onTag
											|| DEFAULT.onTag;
									options.onTagAttr = options.onTagAttr
											|| DEFAULT.onTagAttr;
									options.onIgnoreTag = options.onIgnoreTag
											|| DEFAULT.onIgnoreTag;
									options.onIgnoreTagAttr = options.onIgnoreTagAttr
											|| DEFAULT.onIgnoreTagAttr;
									options.safeAttrValue = options.safeAttrValue
											|| DEFAULT.safeAttrValue;
									options.escapeHtml = options.escapeHtml
											|| DEFAULT.escapeHtml;
									this.options = options;
								}

								/**
								 * 开始处理
								 *
								 * @param {String} html
								 * @return {String}
								 */
								FilterXSS.prototype.process = function(html) {
									var me = this;
									var options = me.options;
									var whiteList = options.whiteList;
									var onTag = options.onTag;
									var onIgnoreTag = options.onIgnoreTag;
									var onTagAttr = options.onTagAttr;
									var onIgnoreTagAttr = options.onIgnoreTagAttr;
									var safeAttrValue = options.safeAttrValue;
									var escapeHtml = options.escapeHtml

									// 是否禁止备注标签
									if (!options.allowCommentTag) {
										html = DEFAULT.stripCommentTag(html);
									}

									// 如果开启了stripIgnoreTagBody
									if (options.stripIgnoreTagBody) {
										var stripIgnoreTagBody = DEFAULT
												.StripTagBody(
														options.stripIgnoreTagBody,
														onIgnoreTag);
										onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
									} else {
										stripIgnoreTagBody = false;
									}

									var retHtml = parseTag(html, function(
											sourcePosition, position, tag,
											html, isClosing) {
										var info = {
											sourcePosition : sourcePosition,
											position : position,
											isClosing : isClosing,
											isWhite : (tag in whiteList)
										};

										// 调用onTag处理
											var ret = onTag(tag, html, info);
											if (!isNull(ret))
												return ret;

											// 默认标签处理方法
											if (info.isWhite) {
												// 白名单标签，解析标签属性
												// 如果是闭合标签，则不需要解析属性
												if (info.isClosing) {
													return '</' + tag + '>';
												}

												var attrs = getAttrs(html);
												var whiteAttrList = whiteList[tag];
												var attrsHtml = parseAttr(
														attrs.html, function(
																name, value) {

															// 调用onTagAttr处理
														var isWhiteAttr = (whiteAttrList
																.indexOf(name) !== -1);
														var ret = onTagAttr(
																tag, name,
																value,
																isWhiteAttr);
														if (!isNull(ret))
															return ret;

														// 默认的属性处理方法
														if (isWhiteAttr) {
															// 白名单属性，调用safeAttrValue过滤属性值
															value = safeAttrValue(
																	tag, name,
																	value);
															if (value) {
																return name
																		+ '="'
																		+ value
																		+ '"';
															} else {
																return name;
															}
														} else {
															// 非白名单属性，调用onIgnoreTagAttr处理
															var ret = onIgnoreTagAttr(
																	tag, name,
																	value,
																	isWhiteAttr);
															if (!isNull(ret))
																return ret;
															return;
														}
													});

												// 构造新的标签代码
												var html = '<' + tag;
												if (attrsHtml)
													html += ' ' + attrsHtml;
												if (attrs.closing)
													html += ' /';
												html += '>';
												return html;

											} else {
												// 非白名单标签，调用onIgnoreTag处理
												var ret = onIgnoreTag(tag,
														html, info);
												if (!isNull(ret))
													return ret;
												return escapeHtml(html);
											}

										}, escapeHtml);

									// 如果开启了stripIgnoreTagBody，需要对结果再进行处理
									if (stripIgnoreTagBody) {
										retHtml = stripIgnoreTagBody
												.remove(retHtml);
									}

									return retHtml;
								};

								module.exports = FilterXSS;
							}, {
								"./default" : 1,
								"./parser" : 3
							} ]
				}, {}, [ 2 ]);

(function() {

	if (!$.browser) {
		var userAgent = navigator.userAgent.toLowerCase();
		// Figure out what browser is being used
		$.browser = {
			version : (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
			safari : /webkit/.test(userAgent),
			opera : /opera/.test(userAgent),
			msie : /msie/.test(userAgent) && !/opera/.test(userAgent),
			mozilla : /mozilla/.test(userAgent)
					&& !/(compatible|webkit)/.test(userAgent)
		};
	}

	CS = {};
	CS.Constants = {
		_EDIT_STATUS_VALUES : {
			INSERTED : "+",
			MODIFIED : "*",
			DELETED : "-"
		}
	};
	CS.info = function(msg) {
		$.dialog && $.dialog.info ? $.dialog.info(msg) : alert(msg);
	};
	CS.warn = function(msg) {
		$.dialog && $.dialog.warn ? $.dialog.warn(msg) : alert(msg);
	};
	CS.appname = "/tzys";
	CS.dictCache = {};

	CS.unidSequence = -1;
	/**
	 * 2个domail对象进行比较，获取已修改的数据用来提交到后台进行处理
	 */
	CS.getModifiedData = function(oldDomain, newDomain) {
		var modifiedData = {};
		if (!oldDomain) {

		} else {

		}
		return modifiedData;
	};

	CS.deleteRecords = function(grid, key, isVoid,idNames) {
		isVoid = isVoid ? true : false;
		idNames = idNames || "unid";
		typeof grid == 'string' ? grid = $('#' + grid) : false;
		jQuery && grid instanceof jQuery ? grid = grid.grid() : false;

		var selectedRecords = grid.getSelectedRecords();
		if (selectedRecords.length == 0) {
			CS.warn("请选择记录");
			return;
		}

		$.dialog.confirm("确认删除记录吗?", "删除", function() {

			var unids = [];
			for ( var i = 0; i < selectedRecords.length; i++) {
				unids.push(selectedRecords[i][idNames]);
			}
			CS.ajax( {
				url : CS.appname + '/fwaction2/common-CommonDelete.tz',
				data : {
					postdata : $.toJSON( {
						unids : unids,
						isvoid : isVoid,
						doclass : key
					})
				},
				complete : function() {
					grid.load();
				}
			});
		});

	};

	CS.copyBaseProperties = function(source, target) {
		for ( var item in source) {
			var elem = source[item];
			if (!elem instanceof Array) {
				target[item] = elem;
			}
		}
	};

	CS.simpleEquals = function(o1, o2) {
		if (o1 === null || o1 === undefined) {
			o1 = '';
		}
		if (o2 === null || o2 === undefined) {
			o2 = '';
		}

		var t1 = typeof (o1);
		var t2 = typeof (o2);
		if (t1 == "undefined")
			return true; // 都是 undefined, 也认为相等
		if (t1 == "object" || t2 == "object") {
			if (o1 instanceof Date) {
				o1 = Ext.encode(o1);
				o1 = o1.substring(1, o1.length - 1);
			}
			if (o2 instanceof Date) {
				o2 = Ext.encode(o2);
				o2 = o2.substring(1, o2.length - 1);
			}
			if (o1 != null && o2 != null) {
				// 除了日期之外的对象, 始终返回 toString() 后的比较结果
				return o1.toString() == o2.toString();
			}
			return o1 == o2;
		} else {
			if ((o1 === '' && o2 === 0) || (o2 === '' && o1 === 0)) {
				return false;
			}
			return o1 == o2; // 数字和字符串支持 "==" 直接比较
		}
	};

	CS.getDictData = function(type) {
		var typeList = (type instanceof Array ? type : [ type ]);
		var requestList = [];
		for ( var i = 0; i < typeList.length; i++) {
			if (!CS.dictCache[typeList[i]]) {
				requestList.push(typeList[i]);
			}
		}
		if (requestList.length > 0) {
			CS.ajax( {
				url : 'fwaction2/common-DictDataLoad.tz',
				async : false,
				type : 'POST',
				dataType : 'json',
				complete : function(res) {
					var responseData = res.responseJSON.result;
					for ( var item in responseData) {
						CS.dictCache[item] = responseData[item];
					}

				},
				data : {
					postdata : $.toJSON( {
						typeList : requestList
					})
				}
			});
		}

		var result = {};
		for ( var i = 0; i < typeList.length; i++) {
			result[typeList[i]] = CS.dictCache[typeList[i]];
		}
		return type instanceof Array ? result : result[type]
	};

	CS.ajax = function(config) {
		
		/** 后台框架需要 **/
		var data=config.data;
		data && data.postdata && typeof data.postdata==='object' ? data.postdata=$.toJSON(data.postdata) : false;
		
		/** load mask **/ 
		var $mask,maskTarget=config.maskTarget
		if(maskTarget){
			$mask=typeof maskTarget =='string' ? document.getElementById(maskTarget) : maskTarget;
			!($mask instanceof jQuery) ? $mask=$($mask) : false;	
			$mask && $mask.mask();
		}
		
		$.ajax( {
			url : config.url,
			async : config.async,
			type : config.type || "post",
			data : data,
			complete : function(result) {
				
				/** load mask **/
				$mask && $mask.unmask();
				
				config.complete  && config.complete(result);
				
				if (result.responseJSON) {
					
					config.success && config.success(result);
			
				} else {
					
					eval("var msg = " + result.responseText);
					
					config.error && config.error(msg);
					
					CS.warn(msg.businessexception || msg.appexception);
				}
			}
		});
	};

	/**
	 * 获取grid的数据用来提交到后台
	 */
	CS.getGridData = function(grid) {
		var modifiedData = grid.getModifiedRecords(true);
		var deletedData = grid.getDeletedRecords();
		var newData = grid.getNewRecords();
		for ( var i = 0; i < modifiedData.length; i++) {
			modifiedData[i].updateflag = "*";
		}
		for ( var i = 0; i < deletedData.length; i++) {
			deletedData[i].updateflag = "-";
		}
		for ( var i = 0; i < newData.length; i++) {
			newData[i].updateflag = "+";
		}
		return modifiedData.concat(deletedData).concat(newData);
	};

	/** 根据DOM ID 获取对应UI对象 **/
	$.getCmp=CS.getCmp=function(id){
		var cmp=$.data(document.getElementById(id),'widget');
		return cmp;
	};
	
	CS.search = function(config) {
		var cfg = config || {};
		var url = cfg.url || CS.appname + '/fwaction2/common-CommonSearch.tz';
		var searchkeys = config.searchkeys;
		var responseText = "";
		$.ajax( {
			url : url,
			async : false,
			type : 'post',
			complete : function(result) {
				responseText = result.responseJSON;
			},
			data : {
				postdata : $.toJSON( {
					searchkeys : searchkeys
				})
			}
		});
		return responseText;
	};

	/**
	 * 通过表单查询表格数据
	 * 或通过特定条件查表格
	 * @param {Object} form
	 * @param {Object} grid
	 */
	CS.query = function(form, grid, options) {
		options = options || {};
		var url = options.url;
		delete options.url;
		
		var async = options.async===false ?false : true;
		delete options.async;

		var postdata = $.extend( {
			searchcondition : CS.fetchFormData(form)
		}, options);

		var type = typeof grid;
		type == 'object' && grid.length ? grid = grid[0] : false;
		type == 'string' ? grid = document.getElementById(grid) : false;
		!grid.load ? grid = $.data(grid, "widget") : false;

		grid.load( {
			start:0,
			url : url,
			async : async,
			postdata : $.toJSON(postdata)
		});
	};
	
	/** 清除校验信息 **/
	CS.clearValidation=function(selector){
		if(!selector){
			return;
		}
		
		var form=selector;
		if(typeof selector =='string'){
			form=document.getElementById(selector) || $(selector);
		}
		
		if(!form || form.length===0){
			return;
		}

		if(form instanceof jQuery){
			for(var i=0,l=form.length;i<l;i++){
				CS.clearValidation(form[i]);
			}
			return;
		}
			
		if(form.tagName==='FORM'){
			var elements=form.elements;
			for(var j=0,s=elements.length;j<s;j++){
				$.clearValidation($(elements[j]));
			}
			return;
		}
		
		$.clearValidation($(form));
		
	};
	
	/** 校验表达数据合法性:ajax校验不可靠 **/
	CS.validateForm=function(form){
		form instanceof jQuery ? form=form[0] : false;
		typeof form==='string' ? form=document.getElementById(form) : false;
		
		var state=true,field=null,elements=form.elements;
		for(var i=0,l=elements.length;state && i<l;i++){
			field=$.data(elements[i],"widget") || null;
			if(field){
				state=field.$element.data("validate")===false ? false : true;
				state===true && field.validate ?  state=field.validate() : false;
				
			}else{
				if(elements[i].name){
					if(elements[i].type==='checkbox' || elements[i].type==='radio'){
						
					}else{
						state=$.validate ? $.validate($(elements[i]),elements[i].value) : true;	
					}
				}
			}
		}
		
		return state;
	};

	/**
	 * 获取表单数据
	 * @param {Object}
	 * @return {Object}
	 * @eg:
	 * 	CS.fetchFormData($form/form/id/object)
	 */
	CS.fetchFormData = function(form,ignoreTextValue) {
	
		/** jQuery Object **/
		if(jQuery && form instanceof jQuery){
			form=form[0];
		}
		
		/** DOM ID OR jQuery selector **/
		if(form && typeof form =='string'){
			form = document.getElementById(form) || (jQuery && $(form)[0]);	
		}
		
		/** DOM Object **/
		if(!form || !form.elements ){
			return {};
		}

		/** record['a.b.c'] VS record['a']['b']['c'] **/
		var setXPathValue=function(name,value,add){

			var r=this,names=name.split(".");
		
			for(var j=0,s=names.length;j<s-1;j++){
				r[names[j]]=r[names[j]] || {};
				r=r[names[j]];
			}
			
			/** XSS过滤 **/
			filterXSS && typeof value==='string' ? value=filterXSS(value) : false;
			
			/** 追加,为了复选框 **/
			add===true || r[names[s-1]]===undefined ? r[names[s-1]]=value : r[names[s-1]]+=","+value;

		};
		
		var data = {},name,value,ele,field, elements = form.elements,l=elements.length,ignoreMapping={};
		
		/** UI **/
		for(var i=0;i<l;i++){
			
			ele=elements[i];
			
			field = $.data(ele, "widget");
			
			if(!field){continue;}
			
			name=(field.$hidden || field.$element)[0].name;
			
			if(!name){continue;}
			
			ignoreMapping[name]=1;
			
			/** value **/
			value=(typeof field.value == 'function' && field.value()) || '';
			value!=='' && setXPathValue.call(data,name,value);
		
			/** 如果需要忽略下拉框文本 **/
			if(ignoreTextValue===true){continue;}
			
			/** text **/
			value=(typeof field.text == 'function' && field.text()) || '';
			value!=='' && field.textField && setXPathValue.call(data,field.textField,value);
	
		}
		
		/** HTML **/
		for(var i=0;i<l;i++){
			
			ele=elements[i];
			
			name=ele.name;
			
			if(!name || ignoreMapping[name]===1){continue;}

			if (ele.type == 'checkbox') {
				
				ele.value!=='' && ele.checked && setXPathValue.call(data,name,ele.value);

			} else {
				if (ele.type == 'radio') {
				
					ele.value!=='' && ele.checked ? setXPathValue.call(data,name,ele.value) : false;

				}else{
					
					ele.value!=='' && setXPathValue.call(data,name,ele.value);
				
				}
			}
		}
		
		/** 通过unid标志新增或者修改数据 **/
		data.updateflag=!data.unid ? "+" : "*";
		
		return data;
	};

	CS.saveData = function(config) {
		var maskTarget = config.maskTarget || $("#" + config.formId);
		maskTarget.mask("保存中...");
		var url = config.url;
		$.ajax( {
			url : url,
			async : false,
			type : 'post',
			complete : function(result) {
				maskTarget.unmask();
				if (result.responseJSON) {
					if (config.success) {
						config.success(result);
					}
				} else {
					eval("var msg = " + result.responseText);
					var info = msg.businessexception || msg.appexception;
					CS.warn("错误代码[" + msg.errorcode + "]," + info);
				}
			},
			data : {
				postdata : $.toJSON( {
					data : config.data
				})
			}
		});
	};

	/** 表单设值 **/
	CS.acceptFormData = function(form, data) {
		/** jQuery Object **/
		if(jQuery && form instanceof jQuery){
			form=form[0];
		}
		
		/** DOM ID OR jQuery selector **/
		if(form && typeof form =='string'){
			form = document.getElementById(form) || (jQuery && $(form)[0]);	
		}
		
		/** DOM Object **/
		if(!form || !form.elements ){
			return;
		}
		var value,name,field,elements=form.elements,l=elements.length,linkages=[],ignoreMapping={};
		
		/** data['a.b.c'] VS data['a']['b']['c'] **/
		var getXPathValue=function(key,json){
			var names,t,k,value=json[key];
			
			if(value===undefined){
				names=name.split(".");
				t=names.length;
				if(t){
					value=json;
					for(k=0;value && k<t-1;k++){
						value=value[names[k]];
					}
					value=value ? value[names[t-1]] : '';
				}
				names=null;
				value===undefined ? value='' : false;
			}
			
			return value;
		};
		
		/** UI设值处理 **/
		for(var i=0;i<l;i++){
			
			field = $.data(elements[i], "widget");
			
			if(!field){continue;}
			
			name=((field.$hidden && field.$hidden[0]) || elements[i]).name;
	
			name ? ignoreMapping[name]=1 : false;
			
			/** 取值 **/
			value=name ? getXPathValue(name,data) : undefined;
	
			switch (field.widget){
				case 'autocomplete':
					
					name && field.reset(value, field.textField ? data[field.textField] : value);
					
					break;
				case 'treefield':
					
					name && field.reset(value, field.textField ? data[field.textField] : value);
					
					break;
				case 'combobox':
					
					/** 当前下拉框作为联动最顶层使用了 **/
					if(field.children && field.children.length){
						
						linkages.push({
							 field:field,
							 value:value
						});
						 
						/** 显示文本看看而已 **/
						field.$element[0].value=(field.textField && data[field.textField]) || value;
					
					}else{
						
						/** 正常下拉框使用 **/
						name && field.reset(value);
					}
					
					break;
				case 'linkage':
				
					/** 收集所有的最顶层联动 **/
					if(!field.parent){
						
						linkages.push({field:field,value:value});
						
					}else{

						/** 一次事件设值 **/
						(function(f,v){
							
							f.one("load",function(e,widget){widget.value(v);});
						
						})(field,value);
						
					}
					
					/** 显示文本看看而已 **/
					field.$element[0].value=(field.textField && data[field.textField]) || value;
					
					break;
				default:
					
					/** textfield,datafield **/
					name && field.reset && field.reset(value);
				
			}
		}

		/** 普通HTML表单设值 **/
		for ( var i = 0; i < l; i++) {
			
			/** name属性 **/
			name=elements[i].name;
			
			/** UI影响 **/
			if(!name || ignoreMapping[name]===1 ){continue;}
			
			/** 取值 **/
			value=getXPathValue(name,data);

			if(elements[i].tagName==='INPUT'){
				
				switch (elements[i].type){
				
					case 'checkbox':
						var v=[];
						value=value===null ? "" : ""+value;
						if(value){
							value=value.split(",");
							/** 海运单处理用到了|分隔 **/
							var txt=elements[i].value.split("|");
							for(var j=0,s=txt.length;j<s;j++){
								jQuery.inArray(txt[j], value)!==-1 && v.push(txt[j]);
							}
							v.length ? elements[i].value=v.join(",") : false;
						}
						$(elements[i]).prop("checked",v.length > 0);
						
						break;
					case 'radio':
						
						$(elements[i]).prop("checked",value!=='' && elements[i].value==value);
						
						break;
					case 'file':
						
						break;

					default:
						
						elements[i].value=value;
						
						break;
				}

			}else{
				
				/** 其它HTML表单元素 **/
				switch (elements[i].tagName){
					case 'SELECT':
						
						elements[i].value=value;
						
						break;
					case 'TEXTAREA':
						
						elements[i].value=value;
						
						break;
					default:
						elements[i].value=value;
				}
			}
				
		}			
	
		/** 加载联动value **/
		for(var i=0,l=linkages.length;i<l;i++){
			linkages[i].field.value(linkages[i].value);
		}
		
		linkages=null;
		ignoreMapping=null;
	};
	
	/** 此方法适用于查看详情页面,将数据灌到特定选择器上,如<span class='n-label' data-name='name'></span> **/
	CS.acceptDetailData=function(container,selecter,data){
		var name,$container=container,$labels=$container.find(selecter || '.n-label');
		
		typeof container ==='string' ? $container=document.getElementById(container) || $(container) : false;
		!($container instanceof jQuery) ? $container=$(container) : false;
		
		for(var i=0,l=$labels.length;i<l;i++){
			name=$labels.eq(i).data("name");
			/** 添加XSS过滤 **/
			name && data[name]!==undefined && $labels.eq(i).text(data[name]);
		}
		
		return this;
	};

	/** 表单/表单元素只读状态 **/
	CS.setReadOnly = function(selector,readOnly) {
		
		readOnly=!!readOnly;
		
		var $selector=null;
		
		/** jQuery Object **/
		if(jQuery && selector instanceof jQuery){
			$selector=selector;
			selector=selector[0];
		}
		
		/** DOM ID OR jQuery selector **/
		if(selector && typeof selector =='string'){
			selector = document.getElementById(selector);
			!selector ? $selector=$(selector) : false;
		}
		
		selector && $selector===null ? $selector=$(selector) : false;
		!selector && $selector && $selector.length ? selector=$selector[0] : false;
		
		/** DOM Object **/
		if(!selector ){
			return;
		}
		
		/** UI Object **/
		var field=$.data(selector,"widget");
		if(field && field.readOnly){
			field.readOnly(readOnly);
			return;
		}
		
		switch(selector.tagName){
			case 'FORM':
				for(var i=0,l=selector.elements.length;i<l;i++){
					CS.setReadOnly(selector.elements[i],readOnly);
				}
				break;
			case 'SELECT':
				$selector[readOnly ? "addClass" : "removeClass"]("readOnly").prop("readOnly",readOnly);
				break;
			case 'TEXTAREA':
				$selector[readOnly ? "addClass" : "removeClass"]("readOnly").prop("readOnly",readOnly);
				break;
			case 'INPUT':
				$selector[readOnly ? "addClass" : "removeClass"]("readOnly").prop("readOnly",readOnly);			
				break;
			default:
				break;
		
		}
	};
	
	/** 清除表单数据 **/
	CS.clearFormData = function(form, data) {
		/** jQuery Object **/
		if(jQuery && form instanceof jQuery){
			form=form[0];
		}
		
		/** DOM ID OR jQuery selector **/
		if(form && typeof form =='string'){
			form = document.getElementById(form) || (jQuery && $(form)[0]);	
		}
		
		/** DOM Object **/
		if(!form || !form.elements ){
			return;
		}
		
		form.reset();
		
		var name = '', field = null,elements = form.elements;

		for ( var i = 0, l = elements.length; i < l; i++) {
			field = $.data(elements[i], "widget");

			if (field!==undefined && null!==field) {
				switch (field.widget){
					case 'textfield':
						field.reset("");
						break;
					case 'datefield':
						field.reset(null);
						break;
					case 'autocomplete':
						field.reset("");
						break;
					case 'linkage':
						break;
					case 'treefield':
						field.reset("");
						break;
					case 'filefield':
						filed.reset();	
						break;
					case 'imageprev':
						break;
					default:
						field.reset();
						break;
				}
			} else {

				/** 浏览器兼容性 **/
				if (elements[i].type == 'hidden') {
					elements[i].value = "";
				}

			}
		}
	};

	CS.saveForm = function(config) {
		var cfg = config || {};
		var formId = cfg.formId;
		var form = $("#" + formId)[0];
		var data = CS.fetchFormData(form);
		config.data = data;
		config.url = config.url || form.action;
		config.success = function(result) {
			$("[name='unid']", form).val(result.responseJSON.unid);
			CS.info("保存成功");
		};
		CS.saveData(config);
	};
	
	/** URL编码 **/
	CS.encodeURL=function(url,data){
		var pts=[],data=data || {};
		
		for(var key in data)
			if(data.hasOwnProperty(key))
				pts.push(key+"="+data[key]);
		
		url.indexOf("?")===-1 && pts.length ? url+="?" : false;
		
		return url+pts.join("&");
	};
	
	/** URL解码 **/
	CS.decodeURL=function(url){
		
		url=decodeURI(url);
		
		url=url.split("?");
		
		var urlData={url:url[0]};
	
		if(url.length > 1){
			url=url[1];
			url=url.split("&");
		
			for(var i=0,l=url.length;i<l;i++){
			
				/** 添加XSS处理 **/
				urlData[url[i].split("=")[0]]=filterXSS(url[i].split("=")[1]);
			
			}
		}
		
		
		
		return urlData;
	};

	/***
	 * 简单模板函数,替换字符串数据
	 * EG:
	 * 		template='welcome you , {user} , today is {date}';
	 * 		json={user:'Tom',date:'2013-01-02'};
	 * 		console.log(CS.JSON2HTML(template,json));
	 * 		output:welcome you , Tom , today is 2013-01-02
	 * 
	 * @param {String} template
	 * @param {JSON Object/Array} json
	 * @return {String} 
	 */
	CS.JSON2HTML = function(template, json) {
		var data = null;
		var replacer = function(str, key) {
			var keys = key.split("."), v = data[keys.shift()];
			for ( var i = 0, l = keys.length; i < l; i++)
				v = v[keys[i]];
			return (typeof v !== "undefined" && v !== null) ? v : "";
		};

		if (json instanceof Array) {
			var html = [];
			for ( var i = 0, l = json.length; i < l; i++) {
				data = json[i];
				html[i] = template.replace(/\{([\w\.]*)\}/g, replacer);
			}
			return html.join("");
		}

		data = json;
		return template.replace(/\{([\w\.]*)\}/g, replacer);
	}
	
	CS.json2Html = function(json, template) {
		var tplEngine = function(tpl, data) {
		    var reg = /<%([^%>]+)?%>/g, 
		        regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, 
		        code = 'var r=[];\n', 
		        cursor = 0;
		 
		    var add = function(line, js) {
		        js? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n') :
		            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		        return add;
		    }
		    while(match = reg.exec(tpl)) {
		        add(tpl.slice(cursor, match.index))(match[1], true);
		        cursor = match.index + match[0].length;
		    }
		    add(tpl.substr(cursor, tpl.length - cursor));
		    code += 'return r.join("");';
		    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
		};

		var code='<% for(var i=0,l=this && this.length || 0;i<l;i++){var item=this[i]; %>'+ template+ '<% } %>';
		return tplEngine(code,json);
	}
	

})();

(function($) {
	// the code of this function is from    
	// http://lucassmith.name/pub/typeof.html   
	$.type = function(o) {
		var _toS = Object.prototype.toString;
		var _types = {
			'undefined' : 'undefined',
			'number' : 'number',
			'boolean' : 'boolean',
			'string' : 'string',
			'[object Function]' : 'function',
			'[object RegExp]' : 'regexp',
			'[object Array]' : 'array',
			'[object Date]' : 'date',
			'[object Error]' : 'error'
		};
		return _types[typeof o] || _types[_toS.call(o)]
				|| (o ? 'object' : 'null');
	};
	// the code of these two functions is from mootools   
	// http://mootools.net   
	var $specialChars = {
		'\b' : '\\b',
		'\t' : '\\t',
		'\n' : '\\n',
		'\f' : '\\f',
		'\r' : '\\r',
		'"' : '\\"',
		'\\' : '\\\\'
	};
	var $replaceChars = function(chr) {
		return $specialChars[chr] || '\\u00'
				+ Math.floor(chr.charCodeAt() / 16).toString(16)
				+ (chr.charCodeAt() % 16).toString(16);
	};
	$.toJSON = function(o) {
		var s = [];
		switch ($.type(o)) {
		case 'undefined':
			return 'undefined';
			break;
		case 'null':
			return 'null';
			break;
		case 'number':
		case 'boolean':
		case 'date':
		case 'function':
			return o.toString();
			break;
		case 'string':
			return '"' + o.replace(/[\x00-\x1f\\"]/g, $replaceChars) + '"';
			break;
		case 'array':
			for ( var i = 0, l = o.length; i < l; i++) {
				s.push($.toJSON(o[i]));
			}
			return '[' + s.join(',') + ']';
			break;
		case 'error':
		case 'object':
			for ( var p in o) {
				o[p]!==undefined && s.push('"' + p + '":' + $.toJSON(o[p]));
			}
			return '{' + s.join(',') + '}';
			break;
		default:
			return '';
			break;
		}
	};
	$.evalJSON = function(s) {
		if ($.type(s) != 'string' || !s.length)
			return null;
		return eval('(' + s + ')');
	};
})(jQuery);
			