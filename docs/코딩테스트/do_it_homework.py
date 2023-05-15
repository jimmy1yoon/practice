import datetime
from heapq import heappush, heappop

def parse_time(t):
    hour = int(t.split(':')[0])
    mint = int(t.split(':')[1])
    return hour * 60 + mint
    
def sort_que(l):
    que = []
    for x in l:
        heappush(que, (parse_time(x[1]), int(x[2]), x[0]))
    return que
    
def main(step, stack, play):
    play = step[1] - stack[-1][1] # 숙제 가능 시간
    stack[-1][2] # 숙제 소요 시간

    if play < stack[-1][2]:
        stack[-1][2] = stack[-1][2] - play
        
    elif (play == stack[-1][2]):
        print('same')
        stack.pop(-1)
        
    elif (play > stack[-1][2]):
        play = play - stack[-1][2]
        stack.pop(-1)
        stack[-1], stack
    
def solution(plans):
    stack = []
    answer = []
    wait_queue = []
    
    que = sort_que(plans)
    
    while len(que) >= 2:
        start, limit, name = heappop(que)
        nstart, nlimit, name = heappop(que)
        
        if start + limit > nstart: # 시간이 없으면
            no_fin = start+limit-nstart 
            heappush(wait_queue,(start, no_fin, name))
        
        elif start+limit <= nstart:
            answer.append(name)
            wasted_time = nstart - start + limit
            
            while wasted_time and wait_queue:
                start, limit, name = heappop(wait_queue)
                if start: 
            
case = '''
1. 
    1. music : 12:20 -> 10
    2. computer : 12: 30 -> 100

2. 
    1. music : 12:20 -> 10
    2. computer : 12: 30 -> 100
    3. science : 12 : 40 -> 50
    
3.
    1. music : 12:20 -> 10
    2. computer : 12: 30 -> 100
    3. science : 12 : 40 -> 50
    4. history : 14 : 00 --> 
    
    science
'''



# solution([["music", "12:20", "20"], # 12:40
#         ["computer", "12:30", "30"], # 13:00
#         ["science", "12:40", "50"], # 13:30
        # ["history", "14:00", "30"],]) #14:30

solution([["music", "12:20", "10"], # 12:40
        ["computer", "12:35", "30"], # 13:00
        ["history", "14:00", "10"],]) #14:30
