// https://leetcode-cn.com/problems/interleaving-string/submissions/

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    if (s1 === "" && s2 === "" && s3 === "") {
        return true;
    }

    let cur1 = 0, cur2 = 0, cur3 = 0;
    const s1Length = s1.length, s2Length = s2.length, s3Length = s3.length;

    let isInterleave = false;

    function compareChar(s1, cur1, s2, cur2, s3, cur3 ) {
        if (isInterleave) {
            return;
        }

        const s3Element = s3.charAt(cur3);

        let s1Char = s1.charAt(cur1);
        if (s3Element && s1Char && s3Element === s1Char) {
            if (cur1 === s1Length - 1 && cur2 === s2Length && cur3 === s3Length - 1) {
                isInterleave = true;
            } else {
                compareChar(s1, cur1+1, s2, cur2, s3, cur3+1);
            }
        }

        let s2Char = s2.charAt(cur2);
        if (s3Element && s2Char && s3Element === s2Char) {
            if (cur1 === s1Length && cur2 === s2Length - 1 && cur3 === s3Length - 1) {
                isInterleave = true;
            } else {
                compareChar(s1, cur1, s2, cur2+1, s3, cur3+1);
            }
        }
    }

    compareChar(s1, cur1, s2, cur2, s3, cur3)

    return isInterleave
};

// let s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac";
// let s1 = "ab", s2 = "", s3 = "ab";
let s1 = "", s2 = "", s3 = "";
isInterleave(s1, s2, s3)

// s1 s1 s2 s2 s2 s2 s1 s1 s2 s1
// a  a  d  b  b  c  b  c  a  c

// s1 s1 s2 s2 s1 s1 s2 s2 s2 s1
// a  a  d  b  b  c  b  c  a  c
