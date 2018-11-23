M = xlsread('experiment_1.csv');
M = M(1:2:83, :);
score = zeros(14, 3);
for i = 1:14
    score(i, 1:2) = M(3*(i-1)+1, 1:2);
    score(i, 3) = mean(M(3*(i-1)+1:3*i, 4));
end

idx01 = (score(:, 2) < 2);
idx23 = ~idx01;

% T test
[h,p,ci,stats] = ttest2(score(idx23,3),score(idx01,3));
% h = 1, p = 0.0161
% the t test reject the null hypothesis that the samples come from
% populations with equal means
% tstat: 2,7994; df: 12; sd: 0.0635

% Box plot
boxplot([score(idx23,3),score(idx01,3)],'Labels',{'Group 1 (MOVE)','Group 2 (NOT MOVE)'});
title('Evaluation of Rhythm Reproduction');
