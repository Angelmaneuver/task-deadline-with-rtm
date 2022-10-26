const EN = {
	TODAY_FORMAT: 'Today',
	DATE_FORMAT:  '$YEAR/$MONTH/$DATE',
	TIME_FORMAT:  'Until $HOURS:$MINUTES',
	UNDECIDED:    {
		DATE:        'Undecided',
		TIME:        '',
	},
	STARTUP:      'Starting up...',
	ATTRIBUTION:  {
		'1':         'Attribution',
		'2':         'This product uses the Remember The Milk API but is not endorsed or certified by Remember The Milk.',
	},
	SETUP:        {
		INFORMATION: 'Setup Procedure',
		STEP1:       {
			'1':    `Step.1`,
			'2':    `Copy the following URL into your browser (⌘ + c) to access the Remember the Milk official site and allow access to your account.`,
		},
		STEP2:       {
			'1':    `Step.2`,
			'2':    `After granting access, click the "Get Token" button.`,
			'text': `Get Token`
		},
		STEP3:       {
			'1':    `Step.3`,
			'2':    `The token has been obtained. Copy the token (⌘ + c) and paste it into the variable "AUTH_TOKEN" in the JavaScript of this widget and restart it.`,
		},
	},
	NO_DATA:      'Congratulations ! No tasks have not been completed !',
}

const JA = {
	TODAY_FORMAT: '今日',
	DATE_FORMAT:  '$YEAR 年 $MONTH 月 $DATE 日',
	TIME_FORMAT:  '$HOURS:$MINUTES まで',
	UNDECIDED:    {
		DATE:        '未定',
		TIME:        '',
	},
	STARTUP:      '起動中です...',
	ATTRIBUTION:  {
		'1':         '帰属',
		'2':         '本製品は Remember The Milk API を使用していますが、Remember The Milk が推奨または認定しているものではありません。',
	},
	SETUP:        {
		INFORMATION: 'セットアップ手順',
		STEP1:       {
			'1':    `Step.1`,
			'2':    `以下の URL をブラウザにコピー (⌘ + c) して remember the milk 公式サイトにアクセスし、貴方のアカウントへのアクセスを許可してください。`,
		},
		STEP2:       {
			'1':    `Step.2`,
			'2':    `アクセスを許可したら、『トークンを取得する』ボタンを押下してください。`,
			'text': `トークンを取得する`
		},
		STEP3:       {
			'1':    `Step.3`,
			'2':    `トークンが取得できました。トークンをコピー (⌘ + c) して、このウィジェットの JavaScript 内変数『AUTH_TOKEN』に貼り付けて再起動してください。`,
		},
	},
	NO_DATA:      'おめでとうございます ! 未達成のタスクはありません !',
}

export {
	EN,
	JA,
}
