-- 创建 team_configs 表
create table if not exists team_configs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  team_config jsonb default '[
    {
      "id": "team-default",
      "logo": "IconMosaic",
      "name": "AIGen-UI",
      "role": "online",
      "permissions": [
        "read"
      ]
    }
  ]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 确保每个用户只有一个团队配置 (唯一索引)
create unique index if not exists idx_team_configs_user_id on team_configs(user_id);

-- 启用团队配置表的 RLS (行级安全策略)
alter table team_configs enable row level security;

-- 团队配置表策略
create policy "Users can view their own team config"
  on team_configs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own team config"
  on team_configs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own team config"
  on team_configs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own team config"
  on team_configs for delete
  using (auth.uid() = user_id);


-- 创建 menu_configs 表
create table if not exists menu_configs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  menu_config jsonb default '{
    "items": [
      {
        "type": "text-button",
        "label": "权限申请"
      },
      {
        "type": "dropdown",
        "label": "语言",
        "options": [
          "中文",
          "English"
        ]
      }
    ]
  }'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 确保每个用户只有一个菜单配置 (唯一索引)
create unique index if not exists idx_menu_configs_user_id on menu_configs(user_id);

-- 启用菜单配置表的 RLS
alter table menu_configs enable row level security;

-- 菜单配置表策略
create policy "Users can view their own menu config"
  on menu_configs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own menu config"
  on menu_configs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own menu config"
  on menu_configs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own menu config"
  on menu_configs for delete
  using (auth.uid() = user_id);

-- 创建自动更新 updated_at 时间戳的函数
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

-- 为团队配置表添加更新时间触发器
create trigger update_team_configs_updated_at
before update on team_configs
for each row
execute procedure update_updated_at_column();

-- 为菜单配置表添加更新时间触发器
create trigger update_menu_configs_updated_at
before update on menu_configs
for each row
execute procedure update_updated_at_column();

-- 创建 page_configs 表
create table if not exists page_configs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  page_config jsonb default '{
    "title": "一级测试导航栏",
    "icon": "IconSettings",
    "isOpen": true,
    "items": [
        {
            "id": "1",
            "name": "test",
            "component": {
                "cardArea": {
                    "gap": "16px",
                    "show": false,
                    "cards": [
                        {
                            "key": "total_order",
                            "data": "1000",
                            "title": "订单数"
                        }
                    ],
                    "columns": 4
                },
                "tableArea": {
                    "height": "500px",
                    "columns": [
                        {
                            "key": "orderNo",
                            "label": "订单号",
                            "width": "100px"
                        },
                        {
                            "key": "statusText",
                            "label": "订单状态",
                            "width": "100px"
                        },
                        {
                            "key": "userName",
                            "label": "用户信息",
                            "width": "100px"
                        },
                        {
                            "key": "guildName",
                            "label": "用户状态",
                            "width": "120px"
                        },
                        {
                            "key": "deviceModel",
                            "label": "用户设备信息",
                            "width": "150px"
                        }
                    ],
                    "scrollX": false,
                    "scrollY": false,
                    "pageSize": 10,
                    "fixedLayout": true,
                    "showCheckbox": true
                },
                "filterArea": {
                    "gap": "16px",
                    "columns": 4,
                    "filters": [
                        {
                            "key": "userId",
                            "type": "input",
                            "label": "用户ID",
                            "placeholder": "请输入用户ID",
                            "defaultValue": ""
                        },
                        {
                            "key": "platformOrderNo",
                            "type": "input",
                            "label": "平台订单号",
                            "placeholder": "请输入平台订单号",
                            "defaultValue": ""
                        },
                        {
                            "key": "businessNo",
                            "type": "input",
                            "label": "业务单号",
                            "placeholder": "请输入业务单号",
                            "defaultValue": ""
                        },
                        {
                            "key": "channelNo",
                            "type": "input",
                            "label": "渠道单号",
                            "placeholder": "请输入渠道单号",
                            "defaultValue": ""
                        },
                        {
                            "key": "orderStatus",
                            "type": "select",
                            "label": "订单状态",
                            "options": [
                                "全部",
                                "待审核",
                                "审核中"
                            ],
                            "placeholder": "请选择订单状态",
                            "defaultValue": ""
                        },
                        {
                            "key": "platformOrder",
                            "type": "select",
                            "label": "平台订单号",
                            "options": [
                                "全部",
                                "PO001",
                                "PO002",
                                "PO003"
                            ],
                            "placeholder": "请选择平台订单号",
                            "defaultValue": "全部"
                        },
                        {
                            "key": "accountType",
                            "type": "select",
                            "label": "账户类型",
                            "options": [
                                "全部",
                                "支付宝",
                                "微信",
                                "银行卡",
                                "PayPal",
                                "Payoneer"
                            ],
                            "placeholder": "请选择账户类型",
                            "defaultValue": "全部"
                        },
                        {
                            "key": "country",
                            "type": "tree-select",
                            "label": "国家-渠道",
                            "placeholder": "请选择国家-渠道",
                            "treeOptions": [
                                {
                                    "label": "埃及",
                                    "value": "egypt",
                                    "children": [
                                        {
                                            "label": "airwallex",
                                            "value": "egypt-airwallex"
                                        },
                                        {
                                            "label": "payoneer",
                                            "value": "egypt-payoneer"
                                        },
                                        {
                                            "label": "payermax",
                                            "value": "egypt-payermax"
                                        },
                                        {
                                            "label": "dlocal（2026.1.6下线）",
                                            "value": "egypt-dlocal"
                                        }
                                    ]
                                },
                                {
                                    "label": "摩洛哥",
                                    "value": "morocco",
                                    "children": [
                                        {
                                            "label": "dlocal",
                                            "value": "morocco-dlocal"
                                        },
                                        {
                                            "label": "payoneer",
                                            "value": "morocco-payoneer"
                                        }
                                    ]
                                },
                                {
                                    "label": "土耳其",
                                    "value": "turkey",
                                    "children": [
                                        {
                                            "label": "dlocal",
                                            "value": "turkey-dlocal"
                                        },
                                        {
                                            "label": "airwallex",
                                            "value": "turkey-airwallex"
                                        },
                                        {
                                            "label": "payoneer",
                                            "value": "turkey-payoneer"
                                        }
                                    ]
                                },
                                {
                                    "label": "阿尔及利亚",
                                    "value": "algeria",
                                    "children": [
                                        {
                                            "label": "dlocal",
                                            "value": "algeria-dlocal"
                                        },
                                        {
                                            "label": "payoneer",
                                            "value": "algeria-payoneer"
                                        }
                                    ]
                                },
                                {
                                    "label": "约旦",
                                    "value": "jordan",
                                    "children": [
                                        {
                                            "label": "dlocal",
                                            "value": "jordan-dlocal"
                                        },
                                        {
                                            "label": "payoneer",
                                            "value": "jordan-payoneer"
                                        }
                                    ]
                                },
                                {
                                    "label": "泰国",
                                    "value": "thailand",
                                    "children": [
                                        {
                                            "label": "airwallex",
                                            "value": "thailand-airwallex"
                                        },
                                        {
                                            "label": "payoneer",
                                            "value": "thailand-payoneer"
                                        }
                                    ]
                                },
                                {
                                    "label": "沙特",
                                    "value": "saudi-arabia",
                                    "children": []
                                }
                            ],
                            "defaultValue": ""
                        },
                        {
                            "key": "region",
                            "type": "select",
                            "label": "大区",
                            "options": [
                                "全部",
                                "华东",
                                "华南",
                                "华北",
                                "华中"
                            ],
                            "placeholder": "请选择大区",
                            "defaultValue": "全部"
                        },
                        {
                            "key": "projectType",
                            "type": "select",
                            "label": "项目类型",
                            "options": [
                                "全部",
                                "直播",
                                "短视频",
                                "游戏",
                                "电商"
                            ],
                            "placeholder": "请选择项目类型",
                            "defaultValue": "全部"
                        },
                        {
                            "key": "applyTime",
                            "type": "date-range",
                            "label": "申请时间",
                            "placeholder": "请选择申请时间"
                        }
                    ]
                },
                "actionsArea": {
                    "show": true,
                    "buttons": [
                        {
                            "key": "search",
                            "label": "查询",
                            "variant": "outline"
                        },
                        {
                            "key": "reset",
                            "label": "重置",
                            "variant": "outline"
                        }
                    ]
                }
            }
        },
        {
            "id": "2",
            "name": "test-各组件展示",
            "component": {
                "cardArea": {
                    "gap": "16px",
                    "show": true,
                    "cards": [
                        {
                            "key": "卡片1",
                            "data": "1000",
                            "title": "卡片1"
                        },
                        {
                            "key": "卡片2",
                            "data": "2000",
                            "title": "卡片2"
                        },
                        {
                            "key": "卡片3",
                            "data": "3000",
                            "title": "卡片3"
                        },
                        {
                            "key": "卡片4",
                            "data": "4000",
                            "title": "卡片4"
                        }
                    ],
                    "columns": 4
                },
                "tableArea": {
                    "height": "500px",
                    "columns": [
                        {
                            "key": "列表1",
                            "label": "列表1-空状态",
                            "width": "120px",
                            "visible": true
                        },
                        {
                            "key": "列表2",
                            "label": "列表2-随机数字",
                            "width": "120px",
                            "visible": true,
                            "mockFormat": "number"
                        },
                        {
                            "key": "列表3",
                            "label": "列表3",
                            "width": "120px",
                            "visible": true,
                            "mockList": [
                                "随机1",
                                "随机2",
                                "随机3",
                                "随机4"
                            ],
                            "mockFormat": "list"
                        },
                        {
                            "key": "列表4",
                            "type": "badge",
                            "label": "列表4-徽标",
                            "width": "120px",
                            "visible": true,
                            "mockFormat": "text"
                        },
                        {
                            "key": "列表5",
                            "type": "status-badge",
                            "label": "列表-时间",
                            "width": "120px",
                            "visible": true,
                            "mockFormat": "datetime"
                        },
                        {
                            "key": "列表6",
                            "type": "text-button",
                            "label": "列表6-按钮",
                            "width": "80px",
                            "buttons": [
                                "编辑",
                                "删除"
                            ],
                            "visible": true,
                            "mockFormat": "number"
                        }
                    ],
                    "scrollX": true,
                    "scrollY": true,
                    "pageSize": 10,
                    "fixedLayout": true,
                    "showCheckbox": true
                },
                "filterArea": {
                    "gap": "16px",
                    "columns": 4,
                    "filters": [
                        {
                            "key": "输入框1",
                            "type": "input",
                            "label": "输入框1",
                            "options": [],
                            "visible": true,
                            "placeholder": "请输入......"
                        },
                        {
                            "key": "下拉框1",
                            "type": "select",
                            "label": "下拉框1",
                            "options": [
                                "选项A",
                                "选项B",
                                "选项C"
                            ],
                            "visible": true,
                            "placeholder": "请选择"
                        },
                        {
                            "key": "时间选择1",
                            "type": "date-range",
                            "label": "时间选择1",
                            "options": [],
                            "visible": true,
                            "placeholder": "请选择时间段"
                        },
                        {
                            "key": "树形选择1",
                            "type": "tree-select",
                            "label": "树形选择1",
                            "options": [],
                            "visible": true,
                            "placeholder": "请选择",
                            "treeOptions": [
                                {
                                    "key": "1",
                                    "title": "1",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                "actionsArea": {
                    "show": true,
                    "buttons": [
                        {
                            "key": "search",
                            "label": "查询",
                            "variant": "outline"
                        },
                        {
                            "key": "reset",
                            "label": "重置",
                            "variant": "outline"
                        },
                        {
                            "key": "可增删改按钮",
                            "label": "可增删改按钮",
                            "variant": "outline",
                            "visible": true
                        }
                    ]
                }
            }
        },
        {
            "id": "sub-1768982565514",
            "name": "test-空状态",
            "component": {
                "tableArea": {
                    "height": "500px",
                    "columns": [],
                    "scrollX": true,
                    "scrollY": true,
                    "showCheckbox": true
                },
                "filterArea": {
                    "gap": "16px",
                    "columns": 4,
                    "filters": []
                }
            }
        }
    ]
}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 确保同一个用户只能有一个相同的一级导航名称 (复合唯一索引)
create unique index if not exists idx_page_configs_user_id_title on page_configs(user_id, title);

-- 启用页面配置表的 RLS
alter table page_configs enable row level security;

-- 页面配置表策略
create policy "Users can view their own page configs"
  on page_configs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own page configs"
  on page_configs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own page configs"
  on page_configs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own page configs"
  on page_configs for delete
  using (auth.uid() = user_id);

-- 为页面配置表添加更新时间触发器
create trigger update_page_configs_updated_at
before update on page_configs
for each row
execute procedure update_updated_at_column();

-- 1. Create a table for Chat Sessions (conversations)
create table public.ai_chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text default 'New Chat',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create a table for Messages
create table public.ai_chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.ai_chat_sessions(id) on delete cascade not null,
  role text not null, -- 'user' or 'assistant'
  content text,
  config_data jsonb, -- Store the generated config JSON here
  status text default 'complete',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS (Security)
alter table public.ai_chat_sessions enable row level security;
alter table public.ai_chat_messages enable row level security;

-- 4. Add Policies (Users can only valid their own data)
-- Sessions
create policy "Users can view their own sessions"
  on public.ai_chat_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on public.ai_chat_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own sessions"
  on public.ai_chat_sessions for delete
  using (auth.uid() = user_id);

-- Messages (Linked via session ownership)
create policy "Users can view messages from their sessions"
  on public.ai_chat_messages for select
  using (
    exists (
      select 1 from public.ai_chat_sessions
      where public.ai_chat_sessions.id = api_chat_messages.session_id
      and public.ai_chat_sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert messages to their sessions"
  on public.ai_chat_messages for insert
  with check (
    exists (
      select 1 from public.ai_chat_sessions
      where public.ai_chat_sessions.id = api_chat_messages.session_id
      and public.ai_chat_sessions.user_id = auth.uid()
    )
  );